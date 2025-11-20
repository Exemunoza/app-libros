// controllers/authController.js
import jwt from 'jsonwebtoken';
import { createUser, validateUser } from '../models/userModel.js';

export async function register(req, res) {
  try {
    const { username, password } = req.body;
    const user = await createUser({ username, password });
    return res.status(201).json({
      msg: 'Usuario registrado con éxito',
      id: user.id,
      username: user.username
    });
  } catch (err) {
    return res.status(400).json({ msg: 'Error al registrar usuario', error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await validateUser({ username, password });
    if (!user) {
      return res.status(401).json({ msg: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '2h'
    });
    return res.json({
      msg: 'Login correcto',
      id: user.id,
      username: user.username,
      token
    });
  } catch (err) {
    return res.status(400).json({ msg: 'Error al iniciar sesión', error: err.message });
  }
}
