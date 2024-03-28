import { Router } from 'express'
import { createProduct } from '../controllers/product.controller.js'

const router = Router()

router.get('/product', createProduct)

export default router