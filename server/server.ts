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
      res.send("Error " + err);
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
      res.send("Error " + err);
    }
  });
}

function fakeNetworkDelay() {
  return wait(200);
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}