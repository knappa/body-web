from flask import Flask
from flask_cors import CORS

# configuration
from server.database import (db_get_tags, db_literature_get,
                             db_literature_insert, db_literature_remove,
                             get_db, init_db, is_db_initialized,
                             literature_db_row_to_dict)

DEBUG = True


# noinspection PyUnusedLocal
def create_app(test_config=None):
    # instantiate the app
    app = Flask(__name__)
    app.config.from_object(__name__)

    # enable CORS
    CORS(app, resources={r"/*": {"origins": "*"}})

    # make sure the literature table is present
    with app.app_context():
        if not is_db_initialized():
            init_db()
            if DEBUG:
                db_literature_insert(
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
        db = get_db()
        if db is not None:
            db.close()

    ################################################################################

    from server.literature import bibtex, literature, single_paper
    from server.people import people, person
    from server.tags import tag_list

    tag_list = app.route("/tags", methods=["GET"])(tag_list)

    literature = app.route("/literature", methods=["GET", "POST"])(literature)
    single_paper = app.route(
        "/literature/<string:ident>", methods=["GET", "PUT", "DELETE"]
    )(single_paper)
    bibtex = app.route("/bibtex", methods=["GET"])(bibtex)

    people = app.route("/personel", methods=["GET", "POST"])(people)
    person = app.route("/person", methods=["GET", "POST", "DELETE"])(person)

    return app


if __name__ == "__main__":
    server_app = create_app()
    server_app.run()
