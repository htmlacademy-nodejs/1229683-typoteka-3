CREATE DATABASE typoteka
  WITH
  OWNER = academy
ENCODING = 'UTF8'
  TEMPLATE = template0
  LC_COLLATE = 'C'
  LC_CTYPE = 'C'
  CONNECTION LIMIT = -1;

GRANT ALL ON DATABASE typoteka TO academy;

DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS articles_categories;
DROP TABLE IF EXISTS articles_comments;


CREATE TABLE articles
(
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  announce VARCHAR(100) NOT NULL,
  full_text VARCHAR(255) NOT NULL,
  created_date DATE
);

CREATE TABLE categories
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE comments
(
  id SERIAL PRIMARY KEY,
  text VARCHAR(255) NOT NULL
);



CREATE TABLE articles_categories
(
  article_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  CONSTRAINT articles_categories_pk PRIMARY KEY (article_id, category_id),
  FOREIGN KEY (article_id) REFERENCES articles (id)
    ON DELETE CASCADE
		ON UPDATE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories (id)
    ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE articles_comments
(
  article_id INTEGER NOT NULL,
  comment_id INTEGER NOT NULL,
  CONSTRAINT articles_comments_pk PRIMARY KEY (article_id, comment_id),
  FOREIGN KEY (article_id) REFERENCES articles (id)
    ON DELETE CASCADE
		ON UPDATE CASCADE,
  FOREIGN KEY (comment_id) REFERENCES comments (id)
    ON DELETE CASCADE
		ON UPDATE CASCADE
);


ALTER TABLE articles ADD FOREIGN KEY (id) REFERENCES articles_categories (article_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE;

ALTER TABLE articles ADD FOREIGN KEY (id) REFERENCES articles_comments (article_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE;

ALTER TABLE categories ADD FOREIGN KEY (id) REFERENCES articles_categories (category_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE;

ALTER TABLE comments ADD FOREIGN KEY (id) REFERENCES articles_comments (comment_id)
		ON DELETE CASCADE
		ON UPDATE CASCADE;
