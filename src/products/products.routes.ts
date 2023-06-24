import { Router } from "express";
import { ProductController } from "./product.controller";
const productController=new ProductController()
export  const productRoute = Router()
productRoute.get("/products",productController.getProducts)

