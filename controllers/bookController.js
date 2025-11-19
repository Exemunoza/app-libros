import { listBooks, findBookById, updateBookStock } from '../models/bookModel.js';

export function getBooks(req, res) {
  const libros = listBooks();
  return res.json(libros);
}

export function comprarLibro(req, res) {
  const { id } = req.params;
  const { cantidad } = req.body;

  if (!cantidad || isNaN(cantidad) || Number(cantidad) <= 0) {
    return res.status(400).json({ msg: 'Debe especificar una cantidad válida' });
  }

  const libro = findBookById(id);
  if (!libro) {
    return res.status(404).json({ msg: 'Libro no encontrado' });
  }

  const cant = Number(cantidad);
  if (libro.cantidad_disponible < cant) {
    return res.status(400).json({
      msg: 'Cantidad no disponible',
      disponible: libro.cantidad_disponible,
      solicitada: cant
    });
  }

  const actualizado = updateBookStock(id, libro.cantidad_disponible - cant);
  return res.json({ msg: 'Compra realizada con éxito', libro: actualizado });
}
