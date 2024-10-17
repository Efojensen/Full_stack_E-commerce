import { Router } from 'express';
import {
    listProducts,
    updateProduct,
    deleteProduct,
    createProduct,
    getProductById,
} from './products_controllers';

const router = Router();

router.get('/', listProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.get('/:id', getProductById);
router.delete('/:id', deleteProduct);

export default router;
