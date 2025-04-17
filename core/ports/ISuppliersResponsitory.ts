export interface ISuppliersResponsitory{
    read():Promise<any>;
    create(value:any):Promise<any>;
    update(value:any):Promise<any>;
    delete(id:number):void;


}