import { ITransactionRepository } from "../../ports/ITransactionRepository";

export class TransactionService{
    constructor(private transactionRespository: ITransactionRepository){

    }
    readAll(){
        return this.transactionRespository.readAll();
    }
}