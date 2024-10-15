import sqlite3 from 'sqlite3';

// Inizializza il database SQLite
export const db = new sqlite3.Database('../server/db/database.sqlite', (err: Error | null) => {
  if (err) {
    throw err;
  }
  console.log('Connected to the SQLite database.');
});
