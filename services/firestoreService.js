import admin from 'firebase-admin';
import firebaseConfig from '../models/data.js';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      ...firebaseConfig,
      private_key: firebaseConfig.private_key
    })
  });
}

const db = admin.firestore();
const collection = db.collection('products');

export async function leerProductos() {
  const snapshot = await collection.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function obtenerProductoPorId(id) {
  const doc = await collection.doc(id).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
}

export async function guardarProducto(data) {
  const docRef = await collection.add(data);
  const nuevoDoc = await docRef.get();
  return { id: nuevoDoc.id, ...nuevoDoc.data() };
}

export async function actualizarProducto(id, data) {
  await collection.doc(id).update(data);
  const actualizado = await collection.doc(id).get();
  return { id: actualizado.id, ...actualizado.data() };
}

export async function eliminarProducto(id) {
  await collection.doc(id).delete();
  return true;
}


