import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

// Rutas API
app.use('/auth', authRoutes);
app.use('/libros', bookRoutes);

// Salud del servidor
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Página mínima
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>API - Sistema de Compra de Libros</title>
      <style>
        body { font-family: system-ui, sans-serif; margin: 2rem; }
        h1 { color: #2c3e50; }
        ul { line-height: 1.6; }
        code { background: #f6f8fa; padding: 2px 6px; border-radius: 4px; }
      </style>
    </head>
    <body>
      <h1>API - Sistema de Compra de Libros</h1>
      <p>Bienvenido 👋. Estas son las rutas disponibles:</p>
      <ul>
        <li><code>POST /auth/register</code> → Registrar usuario</li>
        <li><code>POST /auth/login</code> → Iniciar sesión y obtener JWT</li>
        <li><code>GET /libros</code> → Listar libros disponibles</li>
        <li><code>POST /libros/:id/comprar</code> → Comprar libro (requiere JWT)</li>
        <li><code>/health</code> → Estado del servidor</li>
      </ul>
      <p>Usa <code>Authorization: Bearer &lt;token&gt;</code> en las rutas protegidas.</p>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
