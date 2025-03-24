import { Transaction } from "../entites/DbAws/Transaction";

export interface ITransactionRepository{
    readAll():Promise<any>;
    create(value:Transaction):Promise<any>;

}