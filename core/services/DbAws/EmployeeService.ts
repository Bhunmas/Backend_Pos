import { IEmployeeRepository } from "../../ports/IEmployeeRepository";

export class EmployeeService{
    constructor(private employeeRespository:IEmployeeRepository){
        
    }
    readAll(){
        return this.employeeRespository.readAll();
    }
    readOne(valuebyid:number){
        return this.employeeRespository.readOne(valuebyid);
    }


}