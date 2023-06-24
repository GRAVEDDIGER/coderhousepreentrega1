import { ProductManager } from "../services/fs.dao"
import { ResponseObject } from "./classes"

export interface Product{
    id:number
    title:string
    description:string
    price:number
    thumbnail:string
    code:string
    stock:number
}


export interface IProductService {
    public getData: (limit?:number)=>Promise<ResponseObject<Product>|undefined>,
    public getById:(id:number)=>Promise<ResponseObject<Product>|undefined>,
    public addProduct :(product:Omit<Product,"id">)=>Promise<ResponseObject<Product> | undefined>    
}
