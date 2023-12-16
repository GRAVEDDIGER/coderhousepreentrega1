import { Router } from "express";
import { ProductController } from "./product.controller";
import { schemaParser } from "../carts/cart.schema";
import { addProductSchema, updateProductSchema } from "./product.schema";
const productController = new ProductController()
export const productRoute = Router()
productRoute.get("/products", productController.getProducts)
productRoute.get("/products/:id", productController.getById)
productRoute.post("/product",schemaParser(addProductSchema), productController.addProduct)
productRoute.put("/product/:id",schemaParser(updateProductSchema), productController.updateById)
productRoute.delete("/product/:id", productController.deleteById)
