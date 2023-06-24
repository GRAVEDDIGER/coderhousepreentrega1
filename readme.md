# Desafio 3 CoderHouse

## Basic Web Server FS persistence

## Install
```bash
npm install
```
## Usage

```bash
npm start
```
## Architecture

The server has been implemented using hexagonal layer architecture, theare is a folder products that holds diferent files that provide functionality by abstraction between the diferent layers of the server. 
The service provides a class that manage the FS.DAO class and gives access to the actual data. 
The controller is responsable of handeling the user requests and provide the adecuate responses 
The routes layer singly links the routes to the controller 
The products.json holds the data


## FS DAO Service

To instanciate the class you must provide 2 arguments:
- 1 The path for the products.json file to be stored
- 2 The Type or interface that describes the Data to be stored

```typescript
import {ProductManager} from "path/to/class"
const productManager= new ProductManager<Product>("./path/")
```

## Methods
- 1 getProducts() Retrives the entire array of products from the file 
- 2 getProductById(id) You must pass a number as a id parameter to get the product matching the id 
- 3 updateProduct(id,product) You must pass a number id and a product wich is a Partial of the product type you provided
- 4 addProduct(product) You must provide a product type object, the id will be self instanciated by the class
- 5 deleteProduct(id) You must provide a integer id matching the product to be erased

