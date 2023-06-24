import { Request, Response } from "express";
import { ProductService } from "./product.service";
export class ProductController {
    constructor(
        protected service = new ProductService(),
        public getProducts=(req:Request,res:Response)=>{
            const {pid} =req.query
            if (pid !==undefined && typeof pid ==="string"){
                this.service.getData(parseInt(pid)).then(response=>{
                    if (response?.ok) res.status(200).send(response)
                    else res.status(404).send(response?.error)
                }).catch(e=>console.log(e))
            }
        }
    ){}
}