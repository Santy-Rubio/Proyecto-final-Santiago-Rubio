const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../data/productos.json');

export async function leerProductos() {
  const contenido = await fs.readFile(dataPath, 'utf-8');
  return JSON.parse(contenido);
}

export async function guardarProductos(productos) {
  await fs.writeFile(dataPath, JSON.stringify(productos, null, 2));
}

