import * as model from "../models/productModel.js";

// GET
export const getAllProducts = async (req, res) => {
  try {
    const productos = await model.getAllProducts(req.query);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// GET
export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const producto = await model.getProductById(id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    };

    res.status(200).json(producto);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener producto por ID' });
  }
};

// GET
export const getProductsByCategory = async (req, res) => {
  try {
    const rawCategory = req.params.category;

    if (!category || typeof category !== 'string') {
      return res.status(400).json({ error: 'Categoría inválida' });
    };

    const category = rawCategory.toLowerCase();

    const productos = await model.getProductsByCategory(category);

    if (productos.length === 0) {
      return res.status(404).json({ error: 'No se encontraron productos en esta categoría' });
    };

    res.status(200).json(productos);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar productos por categoría' });
  }
};

// POST
export const createProduct = async (req, res) => {
  try {
    const { title, price, category } = req.body;

    if (!title || !price || !category) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const nuevoProducto = await model.createProduct({ title, price, category });
    res.status(201).json(nuevoProducto);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

// PUT
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    const actualizado = await model.updateProduct(id, newData);

    if (!actualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json(actualizado);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'ID inválido' });
    }

    await model.deleteProduct(id);
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};

// PATCH
export const patchProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const partialData = req.body;

    const productoActualizado = await model.updatePartialProduct(id, partialData);

    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json(productoActualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar parcialmente el producto' });
  }
};

