import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const USERS_PATH = path.join(process.cwd(), 'data', 'users.json');

function readUsers() {
  const raw = fs.readFileSync(USERS_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeUsers(users) {
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
}

export async function createUser({ username, password }) {
  const users = readUsers();
  const exists = users.find(u => u.username === username);
  if (exists) throw new Error('El usuario ya existe');

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: uuidv4(), username, password: hashed };
  users.push(user);
  writeUsers(users);
  return { id: user.id, username: user.username };
}

export async function validateUser({ username, password }) {
  const users = readUsers();
  const user = users.find(u => u.username === username);
  if (!user) return null;
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;
  return { id: user.id, username: user.username };
}
