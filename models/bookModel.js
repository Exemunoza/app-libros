import fs from 'fs';
import path from 'path';

const BOOKS_PATH = path.join(process.cwd(), 'data', 'books.json');

function readBooks() {
  const raw = fs.readFileSync(BOOKS_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeBooks(books) {
  fs.writeFileSync(BOOKS_PATH, JSON.stringify(books, null, 2));
}

export function listBooks() {
  return readBooks();
}

export function findBookById(id) {
  const books = readBooks();
  return books.find(b => b.id === id);
}

export function updateBookStock(id, newCantidad) {
  const books = readBooks();
  const idx = books.findIndex(b => b.id === id);
  if (idx === -1) return null;
  books[idx].cantidad_disponible = newCantidad;
  writeBooks(books);
  return books[idx];
}
