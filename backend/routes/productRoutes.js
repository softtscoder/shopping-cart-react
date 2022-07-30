import { Router } from 'express';
import auth, { admin } from '../middleware/auth.js';

const router = Router();

import {
	getProducts,
	createProduct,
	getProductById,
	deleteProductById,
	updateProductById,
} from '../controllers/productController.js';

router.get('/', getProducts);

router.post('/', auth, admin, createProduct);

router.get('/:id', getProductById);

router.put('/:id', auth, admin, updateProductById);

router.delete('/:id', auth, admin, deleteProductById);

export default router;
