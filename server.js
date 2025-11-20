import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

// Resolver __dirname en ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
app.use('/auth', authRoutes);
app.use('/libros', bookRoutes);

// Salud del servidor
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Demo-libros
app.get('/demo-libros', (req, res) => {
  res.sendFile(path.join(__dirname, 'demo-libros.html'));
});
// Demo-imagenes
app.get('/demo-imagenes', (req, res) => {
  res.sendFile(path.join(__dirname, 'demo-imagenes.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
