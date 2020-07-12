CREATE TABLE book (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  color VARCHAR(100)
);

CREATE TABLE reading_entry (
  id SERIAL PRIMARY KEY,
  book_id INTEGER REFERENCES book (id) NOT NULL,
  start_place VARCHAR(100),
  end_place VARCHAR(100),
  notes VARCHAR(10000),
  created_at TIMESTAMPTZ NOT NULL
);
