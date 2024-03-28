import { Router } from 'express'
import { createProduct, getAllProducts } from '../controllers/product.controller.js'

const router = Router()

router.post('/products', createProduct)
router.get('/products', getAllProducts)

export default router