import { ISupplierHistoryOrderResponsitory } from "../../ports/ISupplierHistoryOrderResponsitory";

export class SupplierOrderHistoryService{
    constructor(private supplierOrderHistoryRespository:ISupplierHistoryOrderResponsitory){

    }
    create(value:any){
        return this.supplierOrderHistoryRespository.create(value);
    }
    readAll(){
        return this.supplierOrderHistoryRespository.readAll();
    }

    readPagination(number:any){
        
        return this.supplierOrderHistoryRespository.readPagination(number);
    }
    
    update(value:any){
        return this.supplierOrderHistoryRespository.update(value);
    
    }
}