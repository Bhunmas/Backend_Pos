import { Employee } from "../entites/DbAws/Employee";
import { LoginEmployee } from "../entites/DbAws/LoginEmployee";
export interface IEmployeeRepository{
    readAll():Promise<any>;
    readOne(valuebyid:number):Promise<any>;
    create(value:Employee):Promise<any>;
    updateEmployee(value:Employee):Promise<any>;
    login(value:LoginEmployee):Promise<any>;


}