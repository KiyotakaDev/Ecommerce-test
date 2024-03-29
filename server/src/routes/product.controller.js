import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductByID,
  updateProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.get("/product/:id", getProductByID);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct)

export default router;
