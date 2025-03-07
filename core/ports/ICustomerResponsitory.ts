import { Customer } from "../entites/customer";


export interface ICustomerRepository {

    add(customer: Customer): void;
    getAll(): Customer[];
}