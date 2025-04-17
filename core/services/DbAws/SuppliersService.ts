import { ISuppliersResponsitory } from "../../ports/ISuppliersResponsitory";

export class SuppliersService{
    constructor(private suppliersRespository:ISuppliersResponsitory){

    }

    create(value:any){
        return this.suppliersRespository.create(value);
    }
    read(){
        return this.suppliersRespository.read();
    }
    delete(id:number){
        return this.suppliersRespository.delete(id);
    }
    update(value:any){
        return this.suppliersRespository.update(value);
    }
    readById(id:number){
        return this.suppliersRespository.readById(id);
    }

    

    
}