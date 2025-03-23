import { Pool } from 'pg';
import { ITransactionRepository } from "../../core/ports/ITransactionRepository";
require('dotenv').config();


export class InPostgresqlTransactionRepository implements ITransactionRepository{
    private client = new Pool({
        user: process.env.USER_DATABASE,
        host: process.env.HOST_DATABASE,
        database: process.env.NAME_DATABASE,
        password: String(process.env.PASSWORD_DATABASE),
        port:process.env.PORT_DATABASE,
        ssl:false
    })
    readAll(): Promise<any> {
        return new Promise(async (resolve,reject)=>{
            const connect = await this.client.connect();
            const res = await this.client.query('SELECT * FROM transactions');
            resolve(res.rows);
            connect.release();
        })
    }
}