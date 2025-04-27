import { IVendorMaterialRepository } from "../../core/ports/IVendorMaterialResponsitory";
import { Pool } from 'pg';
require('dotenv').config();

export class InPostgresqlVendor_MaterialRepository implements IVendorMaterialRepository{
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
    
    readAll(): Promise<any> {
        return new Promise(async(resolve, reject) => {
            const connect = await this.client.connect();
            const serach = await this.client.query('select vendor_materials.mat_id,vendor.vendor_id,vendor.vendor_name from vendor_materials join vendor on vendor.vendor_id = vendor_materials.vendor_id');

            if(serach.rows < 0) reject(serach);
            


            resolve(serach.rows);
            connect.release();
        })
    }
}