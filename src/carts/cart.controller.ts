import { Request, Response } from "express";
import { CartService } from "./cart.service";
import { addProductType, createCartType, getCartProductsType } from "./cart.schema";

export class CartController {
    constructor(
        protected service = new CartService(),
        public createCart = async (req: Request<any,any,createCartType["body"]>, res: Response) => {
            const products: createCartType["body"] = req.body
            
            console.log(products);
            try {
                const response = await this.service.createCart(products)
                if (response?.ok) {
                    res.status(200).send(response.data)
                } else res.status(404).send({ message: "Couldnt create Cart" })

            } catch (error) {
                console.log(error)
                res.status(404).send(error)
            }

        },
        public getCartProduct = async (req: Request<getCartProductsType["params"]>, res: Response) => {
            const { cid } = req.params
            try {
                const response = await this.service.getById(cid)
                if (response?.ok) {
                    if (response?.data !== null && "products" in response?.data)
                        res.status(200).send(response.data.products)
                    else res.status(404).send({ message: "Cart Not Found" })
                }

            } catch (error) { console.log(error) }
        },
        public addProduct = async (req: Request<addProductType["params"],any,any,addProductType["query"]>, res: Response) => {
            const { pid, cid } = req.params
            const { quantity } = req.query
            try {
                let response
                if (quantity !== undefined) {
                    response = await this.service.addProductById(cid, { pid, quantity: parseInt(quantity as string) })
                    console.log(response)
                    if (response?.ok) {
                        res.status(200).send(response.data)
                    } else res.status(404).send({ message: "Something blowed up!" })
                }
                else res.status(404).send({ message: "Must provide a quantity param" })
            } catch (error) { console.log(error) }
            console.log(pid, cid, quantity)
        }
    ) { }
}