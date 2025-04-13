import { ITransactionRepository } from "../../ports/ITransactionRepository";
import { Transaction } from "../../entites/DbAws/Transaction";
import { createZlibService } from '../../../adapters/zlib/zlib';

export class TransactionService{
    constructor(private transactionRespository: ITransactionRepository){

    }
    readAll(){
        return this.transactionRespository.readAll();
    }
    create(value:Transaction){
        return this.transactionRespository.create(value);
    }
    readTable(){
        return this.transactionRespository.readTable();
    }
    async readDetailTable(){
        const zlib = new createZlibService();

       const  res = await this.transactionRespository.readDetailTable()
             
          
       const a = await zlib.inflateSync(res[0].product_detail)
        console.log('res',a)
     
        return res;
        
    }
}