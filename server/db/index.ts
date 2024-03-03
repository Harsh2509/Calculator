const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "./blogs.db",
  sqlite3.OPEN_READWRITE,
  (err: Error) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Connected to the in-memory SQlite database.");
      db.run(
        `CREATE TABLE IF NOT EXISTS blogs (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, markdown TEXT, createdAt TEXT)`
      );
    }
  }
);

export default db;
