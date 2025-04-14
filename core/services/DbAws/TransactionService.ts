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
     readDetailTable(){
        const zlib = new createZlibService();

        const  res =  this.transactionRespository.readDetailTable()
             
        res.then( (res)=>{
            // const a =  await zlib.deflateSync("ชาวกินกาแฟแก้วใหญ่")
            res.forEach(async(element:any) => {
                const b:any = await zlib.inflateSync(element.product_detail)
                element.product_detail = JSON.parse(b);
               
            })
            
            
        })
        console.log('res : ',res)
      
     
        return res;
        
    }
}