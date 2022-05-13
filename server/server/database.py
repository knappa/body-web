import sqlite3
import threading
import uuid
from itertools import chain
from sqlite3 import IntegrityError
from typing import List, Union

from flask import g

# configuration

DEFAULT_TAG_LIST = [
    "lung",
    "immune",
    "liver",
    "heart",
    "brain",
    "kidneys",
    "lymph",
    "misc",
]

DATABASE_FILENAME = "literature.db"
LITERATURE_COLUMNS = [
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

PERSONEL_COLUMNS = [
    "ident",
    "orcid",
    "name",
    "tags",
    "submitter",
    "approved",
    "email",
    "affiliation",
]

# for thread safety
db_lock = threading.Lock()


################################################################################
# database
################################################################################


def get_db():
    """get the database from app context"""
    db = getattr(g, "_database", None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE_FILENAME)
    return db


def is_db_initialized():
    """test to see if the literature table in present in the database"""
    return "literature" in get_db_tables()


def get_db_tables() -> List[str]:
    db = get_db()
    with db_lock:
        tables = list(
            chain.from_iterable(
                db.execute(
                    "SELECT name FROM sqlite_master"
                    " WHERE type ='table' AND name NOT LIKE 'sqlite_%';"
                )
            )
        )
    return tables


def db_literature_get(*, ident: str = None, tags: List[str] = None):
    """Get an item from the literature based on its ident"""
    db = get_db()
    sql_query = "SELECT * FROM literature"
    params = []
    if ident:
        sql_query += " WHERE ident = ?"
        params.append(ident)
    if tags and len(tags) > 0:
        sql_query += " WHERE " + " AND ".join(["INSTR(tags, ?) > 0"] * len(tags))
        params.extend(tags)
    with db_lock:
        results = list(db.execute(sql_query, tuple(params)))
    return results


def db_person_get(*, ident: str = None, tags: List[str] = None):
    db = get_db()
    sql_query = "SELECT * FROM personel"
    params = []
    if ident:
        sql_query += " WHERE ident = ?"
        params.append(ident)
    if tags and len(tags) > 0:
        sql_query += " WHERE " + " AND ".join(["INSTR(tags, ?) > 0"] * len(tags))
        params.extend(tags)
    with db_lock:
        results = list(db.execute(sql_query, tuple(params)))
    return results


def db_get_tags() -> List[str]:
    """Get tag list"""
    db = get_db()
    with db_lock:
        results = list(chain.from_iterable(db.execute("SELECT * FROM tags")))
    results.sort()
    return results


def db_literature_remove(*, ident: str):
    """Remove an item from the literature based on its ident"""
    db = get_db()
    with db_lock:
        sql_query = "DELETE FROM literature WHERE ident = ?"
        results = list(db.execute(sql_query, (ident,)))
        db.commit()
    return results


def db_person_remove(*, ident: str):
    """Remove a person from the personel table based on their ident"""
    db = get_db()
    with db_lock:
        sql_query = "DELETE FROM personel WHERE ident = ?"
        results = list(db.execute(sql_query, (ident,)))
        db.commit()
    return results


def db_literature_insert(
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
    with db_lock:
        db.execute(
            "INSERT INTO literature VALUES ("
            + ", ".join(len(LITERATURE_COLUMNS) * ["?"])
            + " )",
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


def db_person_insert(
    *,
    ident: str = None,
    orcid: str = None,
    name: str,
    tags: Union[str, List[str]],
    submitter: str = None,
    approved: bool = False,
    email: str = None,
    affiliation: str = None,
):
    """Insert an item into the literature"""
    if isinstance(tags, list):
        tags = ",".join(tags)
    if ident is None:
        ident = uuid.uuid4().hex

    db = get_db()
    with db_lock:
        db.execute(
            "INSERT INTO personel VALUES ("
            + ", ".join(len(PERSONEL_COLUMNS) * ["?"])
            + " )",
            (
                ident,
                orcid,
                name,
                tags,
                submitter,
                approved,
                email,
                affiliation,
            ),
        )
        db.commit()
    return ident


def db_add_tag(*, tag_name: str) -> bool:
    """Add a new tag. Returns true if tag is new."""
    db = get_db()
    with db_lock:
        try:
            db.execute("INSERT INTO tags VALUES (?)", (tag_name,))
        except IntegrityError:
            return False
        db.commit()
    return True


def init_db():
    """Initialize the database."""
    tables = get_db_tables()
    db = get_db()
    with db_lock:
        if "literature" not in tables:
            # create literature database
            db.execute("CREATE TABLE literature (" + ",".join(LITERATURE_COLUMNS) + ")")
        if "tags" not in tables:
            # create tag database
            db.execute("CREATE TABLE tags (tag_name TEXT NOT NULL UNIQUE)")
            db.executemany(
                "INSERT INTO tags VALUES (?)", map(lambda x: (x,), DEFAULT_TAG_LIST)
            )
        if "personel" not in tables:
            # create personel database
            db.execute("CREATE TABLE personel (" + ",".join(PERSONEL_COLUMNS) + ")")
        db.commit()


def filter_entries(c_name, val):
    if c_name in ["tags"]:
        return c_name, val.split(",")
    else:
        return c_name, val


def literature_db_row_to_dict(db_row):
    """Convert a literature database row to dictionary form."""
    return dict(
        [
            filter_entries(col_name, value)
            for col_name, value in zip(LITERATURE_COLUMNS, db_row)
        ]
    )


def person_db_row_to_dict(db_row):
    """Convert a personel database row to dictionary form."""
    return dict(
        [
            filter_entries(col_name, value)
            for col_name, value in zip(PERSONEL_COLUMNS, db_row)
        ]
    )
