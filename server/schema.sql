DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS literature;

CREATE TABLE user (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  profile_pic TEXT NOT NULL
);

CREATE TABLE literature (
    ident TEXT NOT NULL,
    doi TEXT NOT NULL,
    tags TEXT NOT NULL,
    submitter TEXT NOT NULL,
    approved TEXT NOT NULL,
    title TEXT NOT NULL,
    authors TEXT NOT NULL,
    abstract TEXT NOT NULL,
    comments TEXT NOT NULL,
    journal TEXT NOT NULL,
    year TEXT NOT NULL,
);