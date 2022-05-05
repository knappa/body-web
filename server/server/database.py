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
    db = get_db()
    with db_lock:
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


def db_literature_get(*, ident: str):
    """Get an item from the literature based on its ident"""
    db = get_db()
    with db_lock:
        sql_query = "SELECT * FROM literature WHERE ident = ?"
        results = list(db.execute(sql_query, (ident,)))
    return results


def db_get_tags() -> List[str]:
    """Get tag list"""
    db = get_db()
    with db_lock:
        results = chain.from_iterable(db.execute("SELECT * FROM tags"))
    return list(results)


def db_literature_remove(*, ident: str):
    """Remove an item from the literature based on its ident"""
    db = get_db()
    with db_lock:
        sql_query = "DELETE FROM literature WHERE ident = ?"
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
    db = get_db()
    with db_lock:
        db.execute("CREATE TABLE literature (" + ",".join(COLUMNS) + ")")
        db.execute("CREATE TABLE tags (tag_name TEXT NOT NULL UNIQUE)")
        db.executemany(
            "INSERT INTO tags VALUES (?)", map(lambda x: (x,), DEFAULT_TAG_LIST)
        )
        db.commit()


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
