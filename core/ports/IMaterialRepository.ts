export interface IMaterialRepository{
    readAll():Promise<any>;
    readOne(valuebyid:number):Promise<any>;
    create(value:any):Promise<any>;
    update(value:any):Promise<any>;
    readCategory(value:any):Promise<any>;
    delete(value:any):Promise<any>;

}