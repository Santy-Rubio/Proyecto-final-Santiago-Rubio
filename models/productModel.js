import { db } from './data.js';
import { collection, setDoc, getDoc, doc, updateDoc, addDoc, query, where, orderBy } from 'firebase/firestore';

const productsCollection = collection(db, 'products');


// Obtener todos los productos
export const getAllProducts = async (queryParams = {}) => {
  try {
    const { category, min, max, sortField = 'price', sortOrder = 'asc' } = queryParams;

    let constraints = [];

    if (category) {
      constraints.push(where('category', '==', category.toLowerCase()));
    };

    if (min) {
      constraints.push(where('price', '>=', parseFloat(min)));
    };

    if (max) {
      constraints.push(where('price', '<=', parseFloat(max)));
    };

    if (sortField) {
      constraints.push(orderBy(sortField, sortOrder));
    };

    const q = constraints.length > 0
      ? query(productsCollection, ...constraints)
      : productsCollection;

    const snapshot = await getDoc(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error('Firestore getAllProducts error:', err.message);
    throw err;
  }
};

// Obtener productos por su ID
export const getProductById = async (id) => {
  try {
    if (!id || typeof id !== 'string') {
      throw new Error('ID inválido');
    };

    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      return null;
    };

    return { id: productSnap.id, ...productSnap.data() };
  } catch (err) {
    console.error('Error en getProductById:', err.message);
    throw err;
  }
};

//Obtener productos por su categoria
export const getProductsByCategory = async (category) => {
  try {
    const q = query(productsCollection, where('category', '==', category));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error('Error al buscar por categoría:', err.message);
    throw err;
  }
};

// Crear Porductos
export const createProduct = async (productData) => {
  try {
    const docRef = await addDoc(productsCollection, productData);
    if (productData.category) {
      productData.category = productData.category.toLowerCase();
    };

    return { id: docRef.id, ...productData };
  } catch (err) {
    console.error('Error al crear producto:', err.message);
    throw err;
  }
};

// Actualizar Productos
export const updateProduct = async (id, newData) => {
  try {
    if (!id || typeof id !== 'string') {
      throw new Error('ID inválido');
    };

    if (newData.category) {
      newData.category = newData.category.toLowerCase();
    };

    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    };

    await setDoc(docRef, newData);

    const updated = await getDoc(docRef);
    return { id: updated.id, ...updated.data() };
  } catch (err) {
    throw err;
  }
};

// Eliminar productos 
export const deleteProduct = async (id) => {
  try {
    const productRef = doc(db, 'products', id);
    await deleteDoc(productRef);
    return true;
  } catch (err) {
    console.error('Error al eliminar producto:', err.message);
    throw err;
  }
};

// Actualizar parcialmente un producto
export const updatePartialProduct = async (id, partialData) => {
  try {
    if (!id || typeof id !== 'string') {
      throw new Error('ID inválido');
    };

    const productRef = doc(db, 'products', id);
    const docSnap = await getDoc(productRef);

    if (!docSnap.exists()) {
      return null;
    };

    await updateDoc(productRef, partialData);

    const updated = await getDoc(productRef);
    return { id: updated.id, ...updated.data() };
  } catch (err) {
    console.error('Firestore error:', err.message);
    throw err;
  }
};
