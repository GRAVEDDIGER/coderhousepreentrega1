import { z } from "zod";

export const addProductSchema=z.object({
    body:z.object({
        title: z.string({invalid_type_error:"title debe ser un string"}),
        description: z.string({invalid_type_error:"description debe ser un string"}),
        price: z.number({invalid_type_error:"price debe ser un numero"}),
        thumbnail: z.string({invalid_type_error:"thumbnail debe ser un string"}),
        code: z.string({invalid_type_error:"code debe ser un string"}),
        stock: z.number({invalid_type_error:"stock debe ser un numero"})
        
    })
})
export type addProductType=z.infer<typeof addProductSchema>

export const updateProductSchema=z.object({
    body:z.object({
        title: z.string({invalid_type_error:"title debe ser un string"}).optional(),
        description: z.string({invalid_type_error:"description debe ser un string"}).optional(),
        price: z.number({invalid_type_error:"price debe ser un numero"}).optional(),
        thumbnail: z.string({invalid_type_error:"thumbnail debe ser un string"}).optional(),
        code: z.string({invalid_type_error:"code debe ser un string"}).optional(),
        stock: z.number({invalid_type_error:"stock debe ser un numero"}).optional()
        
    }),
    params:z.object({
        id:z.string({invalid_type_error:"pid debe ser una cadena"})
    })
})
export type updateProductType=z.infer<typeof updateProductSchema>