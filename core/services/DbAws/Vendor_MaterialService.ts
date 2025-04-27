import {  IVendorMaterialRepository } from "../../ports/IVendorMaterialResponsitory";

export class Vendor_MaterialService{
    constructor(private vendor_matrialRespository:IVendorMaterialRepository){

    }
    readAll(){
        return this.vendor_matrialRespository.readAll();
    }
    
    
}