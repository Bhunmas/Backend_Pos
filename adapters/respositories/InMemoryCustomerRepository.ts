import { Customer } from "../../core/entites/customer";
import { ICustomerRepository } from "../../core/ports/ICustomerResponsitory";
export class InMemoryCustomerRepository implements ICustomerRepository{
    private customer:Customer[] = [];

    add(customer: Customer): void {
        this.customer.push(customer);
    }
    getAll():any[]{
        console.log("Data in repository:", Array.from(this.customer.values()));
        return  Array.from(this.customer.values()).map(customer => customer.toJSON());
    }
}