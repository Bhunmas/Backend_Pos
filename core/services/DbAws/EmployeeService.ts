import { IEmployeeRepository } from "../../ports/IEmployeeRepository";

export class EmployeeService{
    constructor(private employeeRespository:IEmployeeRepository){
        
    }

}