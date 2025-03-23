import { Employee } from "../entites/DbAws/Employee";
export interface IEmployeeRepository{
    readAll():Promise<any>;
    readOne(valuebyid:number):Promise<any>;
    create(value:Employee):Promise<any>;
    updateEmployee(value:Employee):Promise<any>;


}