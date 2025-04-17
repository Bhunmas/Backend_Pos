import { Router, Request, Response } from 'express';
import { TransactionService } from '../../core/services/DbAws/TransactionService';
import { buffer, json } from 'stream/consumers';
const zlib = require('zlib');
const crypto = require('crypto');
export function createTransactionController(
  postgresTransactionService: TransactionService
) {
  const router = new Router();

  router.get('/transactions', async (_req: Request, res: Response) => {
    const result = await postgresTransactionService
      .readAll()
      .then((res) => {
        return { message: 'success', status: '200', result: res };
      })
      .catch(() => {
        return { message: 'error', status: '500' };
      });
    res.status(200).send(result);
  });

  router.post('/create', async (_req: Request, res: Response) => {
    const result = await postgresTransactionService
      .create({
        Transaction_id: Number(_req.body.Transaction_id),
        Employee_id: _req.body.Employee_id,
        Employee_name: _req.body.Employee_name,
        Product_detail: _req.body.Product_detail,
        Quantity: _req.body.Quantity,
        Total_price: Number(_req.body.Total_price),
      })
      .then((res) => {
        return { message: 'success', status: '200', result: res };
      })
      .catch(() => {
        return { message: 'error', status: '500' };
      });
    res.status(200).send(result);
  });

  router.get('/transactions/table', async (_req: Request, res: Response) => {
    const result = await postgresTransactionService
      .readTable()
      .then((res) => {
        return { message: 'success', status: '200', result: res };
      })
      .catch(() => {
        return { message: 'error', status: '500' };
      });
    res.status(200).send(result);
  });
  router.get('/transactions/test', async (_req: Request, res: Response) => {
    const  text = [
      {
        "menu": "Classic Milk Tea",
        "size": "Large",
        "price": "50",
        "quantity": 2,
        "total": 100,
        "toppings": [
          {
            "name": "Boba",
            "price": "10",
            "quantity": 2
          }
        ]
      },
      {
        "menu": "Matcha Milk Tea",
        "size": "Medium",
        "price": "55",
        "quantity": 1,
        "total": 55,
        "toppings": [
          {
            "name": "Red Bean",
            "price": "12",
            "quantity": 1
          }
        ]
      },
      {
        "menu": "Taro Milk Tea",
        "size": "Small",
        "price": "45",
        "quantity": 3,
        "total": 135,
        "toppings": [
          {
            "name": "Coconut Jelly",
            "price": "15",
            "quantity": 3
          }
        ]
      }
      
    ]
 
    const translate = JSON.stringify(text)
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = await crypto.createCipheriv('aes-256-cbc',key,iv);
  
    // const compressed = zlib.deflateSync(Buffer.from(translate, 'utf8'));
    // const base64Compressed = compressed.toString('base64');
    // console.log('Base64 ที่บีบอัดแล้วมีความยาว:', base64Compressed.length, 'ตัวอักษร');
    
    const result = await postgresTransactionService
      .readDetailTable().then((res) => { 
          return { message: 'success', status: '200', result: res };
      })
    // const transaction_id = result.result[0].transaction_id;
    // const product_detail = result.result[0].product_detail;
    // console.log('result ',transaction_id,'\n product_detail',product_detail)
    // const decompressed = zlib.inflateSync(Buffer.from(product_detail, 'base64'));
   
    
    

    // let encryption = cipher.update(zlibData,'utf-8','base64');
    
    // encryption += cipher.final('base64');
    
    // const cipherDecryp  = crypto.createDecipheriv('aes-256-cbc',key,iv);
    // let decryption = cipherDecryp.update(encryption,'base64','utf-8');
    // decryption += cipherDecryp.final('utf-8');
  
    res.status(200).send(result);
  });
  
  

  return router;
}
