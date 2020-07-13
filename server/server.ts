import * as express from "express";
import { Pool } from "pg";

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://localhost:5432/bookworm';
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
// app.use(express.static('public'));

const pgPool = new Pool({
  connectionString: DATABASE_URL,
  // TODO Use SSL in production?
});

configureRoutes();

app.listen(PORT, () => console.log('Example app listening at http://localhost:'+PORT))

function configureRoutes() {
  app.get('/api/books', async (req, res) => {
    try {
      await fakeNetworkDelay();
      const { rows: books } = await pgPool.query('SELECT * FROM book');
      res.send(books);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error " + err);
    }
  });
  
  app.post('/api/books', async (req, res) => {
    try {
      await fakeNetworkDelay();
      const { title, color } = req.body;
      await pgPool.query(
        'INSERT INTO book(title, color) VALUES ($1, $2)',
        [title, color]
      );
      res.send('{}')
    } catch (err) {
      console.error(err);
      res.status(500).send("Error " + err);
    }
  });

  app.put('/api/books/:id', async (req, res) => {
    try {
      await fakeNetworkDelay();
      const { title, color } = req.body;
      const { id } = req.params;
      const queryResult = await pgPool.query(`
        UPDATE book
        SET title = $1, color = $2
        WHERE id = $3
      `,
        [title, color, id]
      );
      if (!queryResult.rowCount) {
        throw new Error("Book not found: ID " + id)
      }
      res.send('{}')
    } catch (err) {
      console.error(err);
      res.status(500).send("Error " + err);
    }
  })

  app.delete('/api/books/:id', async (req, res) => {
    try {
      await fakeNetworkDelay();
      const { id } = req.params;
      const queryResult = await pgPool.query(
        'DELETE FROM book WHERE id = $1',
        [id]
      );
      if (!queryResult.rowCount) {
        throw new Error("Book not found: ID " + id)
      }
      res.send('{}')
    } catch (err) {
      console.error(err);
      res.status(500).send("Error " + err);
    }
  })

  app.get('/api/reading_entries', async (req, res) => {
    try {
      await fakeNetworkDelay();
      const { rows: entries } = await pgPool.query('SELECT * FROM reading_entry');
      const { rows: books } = await pgPool.query('SELECT * FROM book');
      res.send(entries.map(entry => ({
        ...entry,
        book: books.find(b => b.id === entry.book_id)
      })));
    } catch (err) {
      console.error(err);
      res.status(500).send("Error " + err);
    }
  });

  // TODO Maybe restructure:
  // - POST /api/reading_entries -> POST /api/books/:id/reading_entries
  // (Particularly if I end up implementing a "get reading entries for book" endpoint)
  app.post('/api/reading_entries', async (req, res) => {
    try {
      await fakeNetworkDelay();
      const { book_id, start_place, end_place, notes } = req.body;
      await pgPool.query(`
        INSERT INTO reading_entry
          (book_id, start_place, end_place, notes, created_at)
        VALUES
          ($1, $2, $3, $4, current_timestamp)
      `,
        [book_id, start_place, end_place, notes]
      );
      res.send('{}')
    } catch (err) {
      console.error(err);
      res.status(500).send("Error " + err);
    }
  });
}

function fakeNetworkDelay() {
  return wait(200);
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}