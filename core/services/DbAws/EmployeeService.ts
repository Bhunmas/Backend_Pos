import { IEmployeeRepository } from "../../ports/IEmployeeRepository";
import { Employee } from "../../entites/DbAws/Employee";
export class EmployeeService{
    constructor(private employeeRespository:IEmployeeRepository){
        
    }
    readAll(){
        return this.employeeRespository.readAll();
    }
    readOne(valuebyid:number){
        return this.employeeRespository.readOne(valuebyid);
    }
    create(value:Employee){
        return this.employeeRespository.create(value);
    }
    update(value:Employee){
        return this.employeeRespository.updateEmployee(value);
    }


}