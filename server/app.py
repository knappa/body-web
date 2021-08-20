import json
import os
import sqlite3
import uuid
from typing import Dict, List, Union

import requests
from flask import Flask, g, jsonify, redirect, request, url_for
from flask_cors import CORS
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)
from oauthlib.oauth2 import WebApplicationClient

from db import init_db_command
from user import User

# configuration
DEBUG = True
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
GOOGLE_DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)
app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(24)

# enable CORS
CORS(app, resources={r"/*": {"origins": "*"}})

# User session management setup
# https://flask-login.readthedocs.io/en/latest
login_manager = LoginManager()
login_manager.init_app(app)

# Naive database setup
try:
    init_db_command()
except sqlite3.OperationalError:
    # Assume it's already been created
    pass

# OAuth 2 client setup
client = WebApplicationClient(GOOGLE_CLIENT_ID)


# Flask-Login helper to retrieve a user from our db
@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)


TAG_LIST = ["lung", "immune", "liver", "heart", "brain", "kidneys", "lymph", "misc"]


#####


def get_google_provider_cfg():
    # Tip: To make this more robust, you should add error handling to the Google API call,
    # just in case Google’s API returns a failure and not the valid provider configuration document.
    return requests.get(GOOGLE_DISCOVERY_URL).json()


@app.route("/login")
def login():
    # Find out what URL to hit for Google login
    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    # Use library to construct the request for Google login and provide
    # scopes that let you retrieve user's profile from Google
    request_uri = client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=request.base_url + "/callback",
        scope=["openid", "email", "profile"],
    )
    return redirect(request_uri)


@app.route("/login/callback")
def callback():
    # Get authorization code Google sent back to you
    code = request.args.get("code")

    # Find out what URL to hit to get tokens that allow you to ask for
    # things on behalf of a user
    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]

    # Prepare and send a request to get tokens! Yay tokens!
    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url=request.base_url,
        code=code,
    )
    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
    )

    # Parse the tokens!
    client.parse_request_body_response(json.dumps(token_response.json()))

    # Now that you have tokens (yay) let's find and hit the URL
    # from Google that gives you the user's profile information,
    # including their Google profile image and email
    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)

    # You want to make sure their email is verified.
    # The user authenticated with Google, authorized your
    # app, and now you've verified their email through Google!
    if userinfo_response.json().get("email_verified"):
        unique_id = userinfo_response.json()["sub"]
        users_email = userinfo_response.json()["email"]
        picture = userinfo_response.json()["picture"]
        users_name = userinfo_response.json()["given_name"]
    else:
        return "User email not available or not verified by Google.", 400

    # Create a user in your db with the information provided
    # by Google
    user = User(id_=unique_id, name=users_name, email=users_email, profile_pic=picture)

    # Doesn't exist? Add it to the database.
    if not User.get(unique_id):
        User.create(unique_id, users_name, users_email, picture)

    # Begin user session by logging the user in
    login_user(user)

    # Send user back to homepage
    return redirect(url_for("index"))


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("index"))


@app.route("/")
def index():
    if current_user.is_authenticated:
        return (
            "<p>Hello, {}! You're logged in! Email: {}</p>"
            "<div><p>Google Profile Picture:</p>"
            '<img src="{}" alt="Google profile pic"></img></div>'
            '<a class="button" href="/logout">Logout</a>'.format(
                current_user.name, current_user.email, current_user.profile_pic
            )
        )
    else:
        return '<a class="button" href="/login">Google Login</a>'


################################################################################
# database
################################################################################

DATABASE = "literature.db"

COLUMNS = [
    "ident",
    "doi",
    "tags",
    "submitter",
    "approved",
    "title",
    "authors",
    "abstract",
    "comments",
    "journal",
    "year",
]


def get_db():
    """get the database from app context"""
    db = getattr(g, "_database", None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db


def is_db_initialized():
    """test to see if the literature table in present in the database"""
    db = get_db()
    tables = list(
        db.execute(
            """
SELECT 
    name
FROM 
    sqlite_master 
WHERE 
    type ='table' AND 
    name NOT LIKE 'sqlite_%';
"""
        )
    )
    return ("literature",) in tables


################################################################################


def db_get(*, ident: str):
    """Get an item from the literature based on its ident"""
    db = get_db()
    sql_query = "SELECT * FROM literature WHERE ident = ?"
    results = list(db.execute(sql_query, (ident,)))
    return results


def db_remove(*, ident: str):
    """Remove an item from the literature based on its ident"""
    db = get_db()
    sql_query = "DELETE FROM literature WHERE ident = ?"
    results = list(db.execute(sql_query, (ident,)))
    db.commit()
    return results


def db_insert(
    *,
    ident: str = None,
    doi: str,
    tags: Union[str, List[str]],
    submitter: str,
    approved: bool,
    title: str,
    authors: Union[str, List[str]],
    abstract: str,
    comments: str,
    journal: str,
    year: str,
):
    """Insert an item into the literature"""
    if isinstance(tags, list):
        tags = ",".join(tags)
    if isinstance(authors, list):
        authors = ",".join(authors)
    if abstract is None:
        abstract = ""
    if year is None:
        year = ""
    if isinstance(year, int):
        year = str(year)
    if ident is None:
        ident = uuid.uuid4().hex

    db = get_db()
    db.execute(
        "INSERT INTO literature VALUES (" + ", ".join(len(COLUMNS) * ["?"]) + " )",
        (
            ident,
            doi,
            tags,
            submitter,
            approved,
            title,
            authors,
            abstract,
            comments,
            journal,
            year,
        ),
    )
    db.commit()
    return ident


################################################################################


def init_db():
    """Initialize the database."""
    db = get_db()
    db.execute("CREATE TABLE literature (" + ",".join(COLUMNS) + ")")
    db.execute(
        """CREATE TABLE user (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  profile_pic TEXT NOT NULL
);"""
    )
    db.commit()


# make sure the literature table is present
with app.app_context():
    if not is_db_initialized():
        init_db()
        db_insert(
            doi="1",
            tags=["misc"],
            submitter="ACK",
            approved=True,
            title="A disproof of the Riemann Hypothesis",
            authors="A. C. Knapp",
            abstract="We find a zero not on the critical line",
            comments="Better than Cats",
            journal="Annals of Mathematics",
            year="1978",
        )


# noinspection PyUnusedLocal
@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, "_database", None)
    if db is not None:
        db.close()


################################################################################


def db_row_to_dict(db_row):
    """Convert a database row to dictionary form."""

    def filter_entries(c_name, val):
        if c_name in ["tags"]:
            return c_name, val.split(",")
        else:
            return c_name, val

    return dict(
        [filter_entries(col_name, value) for col_name, value in zip(COLUMNS, db_row)]
    )


@app.route("/tags", methods=["GET"])
def tag_list():
    """Return the current list of tags."""
    return jsonify(TAG_LIST)


@app.route("/literature", methods=["GET", "POST"])
def literature():
    """Access the literature.

    * On GET, returns lists of entries
    * On POST, inserts new entries into database
    """
    response_object = {"status": "success"}

    cur = get_db().cursor()

    if request.method == "POST":
        post_data = request.get_json()
        new_ident = db_insert(
            doi=post_data.get("doi"),
            tags=post_data.get("tags"),
            submitter=post_data.get("submitter"),
            approved=False,
            title=post_data.get("title"),
            authors=post_data.get("authors"),
            abstract=post_data.get("abstract"),
            comments=post_data.get("comments"),
            journal=post_data.get("journal"),
            year=str(post_data.get("year")),
        )
        response_object["message"] = "Paper added!"
        response_object["uuid"] = new_ident
    else:
        assert request.method == "GET"
        search_tag_list = request.args.get("tags", "").split(",")
        sql_query = "SELECT * FROM literature"
        if len(search_tag_list) > 0:
            sql_query += " WHERE " + " AND ".join(
                ["INSTR(tags, '" + tag + "') > 0" for tag in search_tag_list]
            )
        literature_entry = cur.execute(sql_query)
        response_object["literature"] = [
            db_row_to_dict(reference) for reference in literature_entry
        ]

    return jsonify(response_object)


@app.route("/literature/<string:ident>", methods=["GET", "PUT", "DELETE"])
def single_paper(ident: str):
    """Access individual entries.

    On PUT, updates database entry corresponding to ident.
    On GET, returns database entry corresponding to ident.
    On DELETE, deletes database entry corresponding to ident
    """
    response_object = {"status": "success"}

    if request.method == "PUT":
        post_data = request.get_json()
        # TODO: catch an error when not present?
        db_remove(ident=ident)
        db_insert(
            ident=ident,
            doi=post_data.get("doi"),
            tags=post_data.get("tags"),
            submitter=post_data.get("submitter"),
            approved=False,
            title=post_data.get("title"),
            authors=post_data.get("authors"),
            abstract=post_data.get("abstract"),
            comments=post_data.get("comments"),
            journal=post_data.get("journal"),
            year=str(post_data.get("year")),
        )
        response_object["message"] = "Paper modified!"
    elif request.method == "GET":
        literature_entry = db_get(ident=ident)
        response_object["literature"] = literature_entry
    else:
        assert request.method == "DELETE"
        db_remove(ident=ident)

    return jsonify(response_object)


@app.route("/bibtex", methods=["GET"])
def bibtex():
    """Find BiBTeX representation of the literature.

    * On GET, returns BiBTeX representation.
    """
    cur = get_db().cursor()

    assert request.method == "GET"
    search_tag_list = request.args.get("tags", "").split(",")
    sql_query = "SELECT * FROM literature"
    if len(search_tag_list) > 0:
        sql_query += " WHERE " + " AND ".join(
            ["INSTR(tags, '" + tag + "') > 0" for tag in search_tag_list]
        )
    literature_entries: List[Dict] = [
        db_row_to_dict(reference) for reference in cur.execute(sql_query)
    ]

    def make_bibtex_entry(reference):
        # unused:
        #     "submitter",
        #     "approved",
        #     "abstract",
        # noinspection SpellCheckingInspection
        return f"""
@misc{{{reference['ident']},
    title = {{{reference['title']}}},
    author = {{{reference['authors']}}},
    year = {{{reference['year']}}},
    journal = {{{reference['journal']}}},
    doi = {{{reference['doi']}}},
    keywords = {{{", ".join(reference['tags'])}}},
    annote = {{{reference['comments']}}},
}}
"""

    return "\n".join(map(make_bibtex_entry, literature_entries))


if __name__ == "__main__":
    app.run(ssl_context="adhoc")
