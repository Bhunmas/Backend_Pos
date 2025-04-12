import { ITransactionRepository } from "../../ports/ITransactionRepository";
import { Transaction } from "../../entites/DbAws/Transaction";

export class TransactionService{
    constructor(private transactionRespository: ITransactionRepository){

    }
    readAll(){
        return this.transactionRespository.readAll();
    }
    create(value:Transaction){
        return this.transactionRespository.create(value);
    }
    readTable(value:any){
        return this.transactionRespository.readTable(value);
    }
}