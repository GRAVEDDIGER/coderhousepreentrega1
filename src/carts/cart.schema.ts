import { NextFunction, Request, Response } from "express";
import { ZodSchema,  z } from "zod";

export const createCartSchema= z.object({body:z.array(z.object({
    pid:z.string({invalid_type_error:"pid debe ser un string"}),
    quantity:z.number({invalid_type_error:"quantity debe ser un numero"})
},{invalid_type_error:"Debe ser un objeto con las propiedades  pid:number y quantity:number"}),{invalid_type_error:"Debes enviar un array de {pid:number,quantity:number}[]"})})
export type createCartType=z.infer<typeof createCartSchema>

export const schemaParser= (schema:ZodSchema)=>{
return (req:Request,res:Response,next:NextFunction)=>{
    const response =schema.safeParse(req)
    if (response.success) next() 
    else{ console.log("mal dato",response.error)
    res.status(400).send({message:"Bad request",error:response.error})
}
}
}

export const addProductSchema= z.object({
    params:z.object({
        cid:z.string({invalid_type_error:"cid debe ser una cadena"}),
        pid:z.string({invalid_type_error:"pid debe ser una cadena"})

    }),
    query:z.object({
        quantity:z.string().refine(value=>{
            if (isNaN(parseInt(value))) return false
            return true
        },{message:"quantity debe ser un numero"})
    })
})
export type addProductType =z.infer<typeof addProductSchema>

export const getCartProductsSchema =z.object({
    params:z.object({cid:z.string({invalid_type_error:"cid debe ser una cadena"})})
})
export type getCartProductsType=z.infer<typeof getCartProductsSchema>
