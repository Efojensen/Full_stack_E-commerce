import { eq } from 'drizzle-orm';
import { db } from '../../db/index'
import { Request, Response } from 'express';
import { productsTable } from '../../db/productsSchema';

export async function listProducts(req: Request, res: Response) {
    try {
        const products = await db
            .select()
            .from(productsTable);
        res.json(products)
    } catch (e) {
        res.status(500).send(e);
    }
    res.send('listProducts')
}

export async function updateProduct(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const updatedFields = req.body;

        const [product] = await db.update(productsTable)
            .set(updatedFields)
            .where(eq(productsTable.id, id))
            .returning();

        if (product) {
            return res.json(product)
        } else {
            return res.status(404).send({ message: 'Product was not found' });
        }
    } catch (e) {
        res.status(500).send(e);
    }
}

export async function deleteProduct(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
        const [deletedProduct] = await db.
            delete(productsTable)
            .where(eq(
                productsTable.id, id
            )).returning()

        if (deletedProduct){
            return res.status(204).send();
        } else {
            return res.status(404).send({message: 'Product was not found'})
        }
    } catch (e) {
        return res.status(500).send(e)
    }
    res.send('deleteProduct')
}

export async function getProductById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const [product] = await db
            .select()
            .from(productsTable)
            .where(eq(
                productsTable.id, Number(id),
            ));

        if (!product) {
            return res.status(404).send({message: 'Product not found'})
        } else {
            return res.json(product);
        }
    } catch (e){
        return res.status(500).send(e)
    }
    res.send('getProductById')
}

export async function createProduct(req: Request, res: Response) {
    try {
        const [product] = await db
            .insert(productsTable)
            .values(req.body)
            .returning();
        res.status(201).json(product)
    } catch (e) {
        res.sendStatus(500).send(e).json()
    }
}