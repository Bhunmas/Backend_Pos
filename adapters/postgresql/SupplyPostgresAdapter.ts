import { ISuppliersResponsitory  } from "../../core/ports/ISuppliersResponsitory";
import { Pool } from 'pg';
require('dotenv').config();
//
export class InPostgresqlSuppliersRepository implements ISuppliersResponsitory{

     private client = new Pool({
            user: process.env.USER_DATABASE,
            host: process.env.HOST_DATABASE,
            database: process.env.NAME_DATABASE,
            password: String(process.env.PASSWORD_DATABASE),
            // port:process.env.PORT_DATABASE,
            // ssl:false
            ssl:{
                rejectUnauthorized:false
            }
        })
    create(value: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const connect = await this.client.connect();
            const res = await this.client.query(`insert into vendor(vendor_name,vendor_personalname,phone_number,vendor_email,vendor_address,active) values('${value.vendor_name}','${value.vendor_personalName}','${value.phone_number}','${value.vendor_email}','${value.vendor_address}',true)`);
            resolve(res.rows);
            connect.release();
           
        })
    }
    read(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const connect = await this.client.connect();
            const res = await this.client.query('SELECT * FROM vendor');
            resolve(res.rows);
            connect.release();
           
        })
    }
    delete(id: number):any {
        return new Promise(async (resolve, reject) => {
            const connect = await this.client.connect();
            const res = await this.client.query(`delete  FROM vendor where vendor_id = ${id}`);
            resolve(res.rows)
            connect.release();
           
        })

    }
    update(value: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const connect = await this.client.connect();
            const res = await this.client.query(`update vendor set vendor_name = '${value.vendor_name}',vendor_personalname = '${value.vendor_personalName}',phone_number = '${value.phone_number}',vendor_email='${value.vendor_email}',vendor_address = '${value.vendor_address}' where vendor_id = ${value.vendor_id}`);
            resolve(res.rows);
            connect.release();
        })
    }
    readById(id:number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const connect = await this.client.connect();
            const res = await this.client.query(`SELECT * FROM vendor where vendor_id = ${id}`);
            resolve(res.rows);
            connect.release();
           
        })
    }
}