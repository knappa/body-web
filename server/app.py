import sqlite3
import uuid
from typing import List, Union

from flask import Flask, g, jsonify, request
from flask_cors import CORS

# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r"/*": {"origins": "*"}})

TAG_LIST = ["lung", "immune", "liver", "heart", "brain", "kidneys", "lymph", "misc"]

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


if __name__ == "__main__":
    app.run()
