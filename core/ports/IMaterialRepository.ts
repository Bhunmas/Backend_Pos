export interface IMaterialRepository{
    readAll():Promise<any>;
    readOne(valuebyid:number):Promise<any>;
    create(value:any):Promise<any>;
    update(value:any):Promise<any>;
}