import { Router } from 'express'
import { createProduct, getAllProducts, updateProduct } from '../controllers/product.controller.js'

const router = Router()

router.post('/products', createProduct)
router.get('/products', getAllProducts)
router.patch('/product/:id', updateProduct)

export default router