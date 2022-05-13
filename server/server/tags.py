from flask import jsonify, request

from server.database import db_add_tag, db_get_tags


def tag_list():
    """Return the current list of tags."""
    if request.method == "POST":
        post_data = request.get_json()

        if db_add_tag(tag_name=post_data.get("tag_name")):
            response_object = {"status": "success"}
            return jsonify(response_object)
        else:
            response_object = {"status": "failure"}
            return jsonify(response_object)
    else:
        assert request.method == "GET"
        return jsonify(db_get_tags())
