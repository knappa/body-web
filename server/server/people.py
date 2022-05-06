from flask import jsonify, request

from server.database import (db_person_get, db_person_insert,
                             person_db_row_to_dict)


def people():
    """Access the list of people.

    * On GET, returns lists of entries
    * On POST, inserts new entries into database
    """
    response_object = {"status": "success"}

    if request.method == "POST":
        post_data = request.get_json()
        new_ident = db_person_insert(
            orcid=post_data.get("orcid"),
            name=post_data.get("name"),
            tags=post_data.get("tags"),
            submitter=post_data.get("submitter"),
            approved=False,
            email=post_data.get("email"),
            affiliation=post_data.get("affiliation"),
        )
        response_object["message"] = "Person added!"
        response_object["uuid"] = new_ident
    else:
        assert request.method == "GET"
        search_tag_list = request.args.get("tags", "").split(",")
        response_object["personel"] = [
            person_db_row_to_dict(person_record)
            for person_record in db_person_get(tags=search_tag_list)
        ]

    return jsonify(response_object)


def person():
    return None
