from flask import jsonify

from server import db_get_tags


def tag_list():
    """Return the current list of tags."""
    return jsonify(db_get_tags())
