INSERT INTO book (title, color)
VALUES
  ('Green Eggs and Ham', '#19a600'),
  ('The Adventures of Sherlock Holmes', NULL)
;

DO $$
DECLARE
  green_eggs integer:= (SELECT id FROM book WHERE title = 'Green Eggs and Ham');
  sherlock integer:= (SELECT id FROM book WHERE title = 'The Adventures of Sherlock Holmes');
BEGIN
  INSERT INTO reading_entry (created_at, end_place, notes, book_id)
  VALUES
    ('2020-01-01 09:00:00 America/Los_Angeles', '1', 'Started', green_eggs),
    ('2020-01-01 12:00:00 America/Los_Angeles', '10', NULL, green_eggs),
    ('2020-01-01 17:00:00 America/Los_Angeles', '20', 'Finished', green_eggs),
    ('2020-01-03 12:00:00 America/Los_Angeles', '1', NULL, sherlock),
    ('2020-01-04 12:00:00 America/Los_Angeles', '100', NULL, sherlock),
    ('2020-01-05 12:00:00 America/Los_Angeles', '200', NULL, sherlock)
  ;
END $$;
