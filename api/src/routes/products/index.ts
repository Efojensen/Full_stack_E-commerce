import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('The list of products');
});

router.post('/', (req, res) => {
    res.send('New product created');
});

export default router;
