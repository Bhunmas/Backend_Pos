import { ISuppliersResponsitory } from "../../ports/ISuppliersResponsitory";

export class SuppliersService{
    constructor(private suppliersRespository:ISuppliersResponsitory){

    }

    create(){
        return this.suppliersRespository.create("");
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

    

    
}