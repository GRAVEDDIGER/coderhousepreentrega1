import { ResponseObject } from "../entities/classes";
import { IProductService,  Product } from "../entities/products";
import { ProductManager } from "../services/fs.dao";
const productManager= new ProductManager<Product>("./src/products/")
export class ProductService implements IProductService {
    constructor(
        protected dao = productManager,
        public getData = async (limit?:number)=>{
            try{
                const data= await this.dao.getProducts()
                if (limit !== undefined &&data !== undefined && Array.isArray(data)){
                    const processedData = data.slice(0,limit)
                    return new ResponseObject<Product>(null,true,processedData)
                }else if(data !== undefined){
                    return new ResponseObject<Product>(null,true,data)
                }else return new ResponseObject<Product>("Data response is null",false,null)
            }catch(e){console.log(e)}
        },
        public getById= async (id:number)=>{
            try {
                const data = await this.dao.getProductById(id)
                if (data !== undefined) return new ResponseObject<Product>(null,true,data)
                else return new ResponseObject<Product>("Product not found",false,null)
            }
            catch(e){console.log(e)}
        },
        public addProduct =async (product:Omit<Product,"id">)=>{
            try {
               const response= await this.dao.addProduct(product)
               return new ResponseObject<Product>(null,true,response as Product)
                
            }catch(e){console.log(e)}
        }
    ){
    }
}