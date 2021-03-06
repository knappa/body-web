from typing import Dict, List

from flask import jsonify, request

from server import (db_literature_get, db_literature_insert,
                    db_literature_remove, literature_db_row_to_dict)
from server.util import tags_sanitize


def literature():
    """Access the literature.

    * On GET, returns lists of entries
    * On POST, inserts new entries into database
    """
    response_object = {"status": "success"}

    if request.method == "POST":
        post_data = request.get_json()
        new_ident = db_literature_insert(
            doi=post_data.get("doi"),
            tags=tags_sanitize(post_data.get("tags")),
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
        literature_entry = db_literature_get(tags=search_tag_list)
        response_object["literature"] = [
            literature_db_row_to_dict(reference) for reference in literature_entry
        ]

    return jsonify(response_object)


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
        db_literature_remove(ident=ident)
        db_literature_insert(
            ident=ident,
            doi=post_data.get("doi"),
            tags=tags_sanitize(post_data.get("tags")),
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
        literature_entry = db_literature_get(ident=ident)
        response_object["literature"] = literature_entry
    else:
        assert request.method == "DELETE"
        db_literature_remove(ident=ident)

    return jsonify(response_object)


def bibtex():
    """Find BiBTeX representation of the literature.

    * On GET, returns BiBTeX representation.
    """
    assert request.method == "GET"
    search_tag_list = request.args.get("tags", "").split(",")
    literature_entries: List[Dict] = [
        literature_db_row_to_dict(reference)
        for reference in db_literature_get(tags=search_tag_list)
    ]

    def make_bibtex_entry(reference):
        # unused:
        #     "submitter",
        #     "approved",
        #     "abstract",
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
