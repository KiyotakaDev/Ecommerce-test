import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductByID,
  updateProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.get("/product/:id", getProductByID);
router.put("/product/:id", updateProduct);

export default router;
