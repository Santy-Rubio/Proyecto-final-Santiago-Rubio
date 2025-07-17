//productRoute.js
import express from 'express';
import * as controller from '../controllers/productController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();


router.get('/', auth, controller.getAllProducts);
router.get('/categoria/:category', auth, controller.getProductsByCategory);
router.get('/:id', auth, controller.getProductById);
router.post('/', auth, controller.createProduct);
router.put('/:id', auth, controller.updateProduct);
router.patch('/:id', auth, controller.patchProduct);
router.delete('/:id', auth, controller.deleteProduct);


export default router;
