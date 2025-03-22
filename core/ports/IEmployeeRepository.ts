import { Employee } from "../entites/DbAws/Employee";
export interface IEmployeeRepository{
    readAll():Promise<any>;
    readOne(valuebyid:number):Promise<any>;


}