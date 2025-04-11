import { IEmployeeRepository } from "../../ports/IEmployeeRepository";
import { Employee } from "../../entites/DbAws/Employee";
import { LoginEmployee } from "../../entites/DbAws/LoginEmployee";
export class EmployeeService{
    constructor(private employeeRespository:IEmployeeRepository,){
        
    }
    readAll(){
        return this.employeeRespository.readAll();
    }
    login(value:LoginEmployee){
      
        return this.employeeRespository.login(value);
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