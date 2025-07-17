import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import productRoutes from './routes/productRoute.js';
import authRoutes from './routes/authRoutes.js'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

import errorHandler from './middlewares/errorHandler.js';
app.use(errorHandler);

app.use('/api', authRoutes);



const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
