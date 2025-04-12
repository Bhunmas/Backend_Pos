import { Router, Request, Response } from 'express';
import { TransactionService } from '../../core/services/DbAws/TransactionService';

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
        Product_id: Number(_req.body.Product_id),
        Product_name: _req.body.Product_name,
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
  

  return router;
}
