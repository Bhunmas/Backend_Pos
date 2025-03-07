import { IMysqlResponsitory } from "../../core/ports/IMysqlResponsitory";
require('dotenv').config();
const mysql = require('mysql2/promise');
const { DateTime } =require('luxon');
// mysqlpos.ct4ac4yko25r.ap-southeast-2.rds.amazonaws.com

export class Mysql implements IMysqlResponsitory{
    private connect  = mysql.createPool({
      host:process.env.HOST_DATABASE,
      user:process.env.USER_DATABASE,
      password:process.env.PASSWORD_DATABASE,
      database:process.env.NAME_DATABASE,  
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
  })
  
    connectDb():void{
      const self = this;
      this.connect.connect(function(err:any) {
            if (err) {
              console.error('Error connecting to the database: ' + err.stack);
              return;
            }
            console.log('Connected to MySQL as id ' + self.connect.threadId);
          });
    }
    async readOne(id:number): Promise<any> {
        return new Promise(async (resolve, reject) => {
          
          try {
            const connection = await this.connect.getConnection();  // Get a connection
            const [rows] = await connection.execute('SELECT * FROM posproject.Products WHERE product_id = ?',[id]);  // Execute query
            console.log(rows);
            const result:any = {};
            result.results = rows;
            result.status = 200;
            result.message = "Success";
            result.time = DateTime.now().setZone('Asia/Bangkok').toFormat('dd-mm-yyyy hh:mm')
              // Output rows
            resolve(result)
            connection.release();  // Release connection
        } catch (error) {
            console.error('Error fetching rows:', error);
            reject("Error fetching rows:")
        }
          }
        )
    }  
    async readAll(): Promise<any> {
      return new Promise(async (resolve, reject) => {
        try{
          const connection = await this.connect.getConnection();
          const [rows] = await connection.execute('SELECT * FROM posproject.Products')
          const result:any = {}
          result.results = [rows]
          result.status = 200
          result.message = "Success"
          result.time = DateTime.now().setZone('Asia/Bangkok').toFormat('dd-mm-yyyy hh:mm')
          resolve(result)
          connection.release()
        }catch(err){
          reject("Error fetching rows;")
        }
       
      


      })
          
    }
}