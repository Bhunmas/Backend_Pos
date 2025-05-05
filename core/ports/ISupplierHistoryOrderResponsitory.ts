

export interface ISupplierHistoryOrderResponsitory{
    readAll():Promise<any>;
    readPagination(number:any):Promise<any>;
    create(value:any):Promise<any>;
    update(value:any):Promise<any>;
}