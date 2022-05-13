from flask import jsonify, request

from server.database import db_add_tag, db_get_tags
from server.util import tag_sanitize, tags_sanitize


def tag_list():
    """Return the current list of tags."""
    if request.method == "POST":
        post_data = request.get_json()

        tag = tag_sanitize(post_data.get("tag_name"))

        if len(tag) <= 0:
            return

        if db_add_tag(tag_name=tag):
            response_object = {"status": "success"}
            return jsonify(response_object)
        else:
            response_object = {"status": "failure"}
            return jsonify(response_object)
    else:
        assert request.method == "GET"
        return jsonify(tags_sanitize(db_get_tags()))
