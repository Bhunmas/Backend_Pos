import {  IMaterialRepository } from "../../ports/IMaterialRepository";

export class MaterialService{
    constructor(private materialRespository:IMaterialRepository){

    }
    readAll(){
        return this.materialRespository.readAll();
    }
    create(value:any){
        return this.materialRespository.create(value);
    
    }
    update(value:any){
        return this.materialRespository.update(value);
    }
    readCategory(value:any){
        return this.materialRespository.readCategory(value);
    }

    
    
}