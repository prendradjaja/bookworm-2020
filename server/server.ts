import * as express from "express";
import { Pool } from "pg";

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://localhost:5432/bookworm';
const PORT = process.env.PORT || 8000;

const app = express();
// app.use(express.json());
// app.use(express.static('public'));

const pgPool = new Pool({
  connectionString: DATABASE_URL,
  // TODO Use SSL in production?
});

configureRoutes();

app.listen(PORT, () => console.log('Example app listening at http://localhost:'+PORT))

function configureRoutes() {
  // TODO Fake network delay?

  app.get('/api/books', async (req, res) => {
    try {
      const result = await pgPool.query('SELECT * FROM book');
      res.send(result.rows);
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  });
}