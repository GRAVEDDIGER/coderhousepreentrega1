import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { Product } from "../entities/products";
import { ResponseObject } from '../entities/classes';
import { addProductType, updateProductType } from "./product.schema";
export class ProductController {
    constructor(
        protected service = new ProductService(),
        public getProducts = (req: Request, res: Response) => {
            const { pid } = req.query
            if (pid !== undefined && typeof pid === "string") {
                this.service.getData(parseInt(pid)).then(response => {
                    if (response?.ok) res.status(200).send(response)
                    else res.status(404).send(response?.error)
                }).catch(e => console.log(e))
            } else {
                this.service.getData().then(response => {
                    if (response?.ok) {
                        res.status(200).send(response)

                    } else res.status(404).send(response?.error)
                }).catch(e => console.log(e))
            }
        },
        public addProduct = async (req: Request<any,any,addProductType["body"]>, res: Response) => {
            const { code, description,  price, stock, thumbnail, title }: addProductType["body"] = req.body
            const response = await this.service.addProduct({ code, description, price, stock, thumbnail, title })
            if (response !== undefined) res.status(200).send(response)
            else res.status(404).send("Unable to add product")
        },
        public getById = async (req: Request, res: Response) => {
            const { id } = req.params
            try {
                const response = await this.service.getById(id)
                if (response?.ok) res.status(200).send(response)
                else res.status(404).send(response)
            } catch (e) { console.log(e) }
        },
        public updateById = async (req: Request<updateProductType["params"],any,updateProductType["body"]>, res: Response) => {
            const {id}= req.params
            const product: updateProductType["body"] = req.body
            try {
                const data: ResponseObject<Product> = await this.service.getById(id)
                let procesedData: Product
                if (data?.ok) {
                    if (!Array.isArray(data?.data) && data?.data !== null) {
                        procesedData = { ...data.data, ...product,id };
                        const response = await this.service.updateProduct(procesedData)
                        if (response?.ok) {
                            res.status(200).send(response)
                        } else res.status(404).send(response)
                    }
                }
            } catch (error) {
                console.log(error)
                res.status(404).send("caboom")
            }
        },
        public deleteById = async (req: Request, res: Response) => {
            const { id } = req.params
            try {
                const response = await this.service.deleteProduct(id)
                if (response?.ok) {
                    res.status(200).send(response)
                } else res.status(404).send(response)

            } catch (error) { console.log(error) }
        }
    ) { }
}