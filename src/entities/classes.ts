export class ResponseObject<T>{
    constructor(
        public error:any,
        public ok:boolean,
        public data:T|T[]|null
        
    ){}
    
}