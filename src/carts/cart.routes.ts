import { Router } from "express";
import { CartController } from "./cart.controller";
import { addProductSchema, createCartSchema, getCartProductsSchema, schemaParser } from "./cart.schema";
export const cartRouter = Router()
const cartController = new CartController()
cartRouter.post("/:cid/product/:pid",schemaParser(addProductSchema), cartController.addProduct)
cartRouter.post("/", schemaParser(createCartSchema),cartController.createCart)
cartRouter.get("/:cid",schemaParser(getCartProductsSchema), cartController.getCartProduct)