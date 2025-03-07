
import { Stats } from "fs";
import { OrderDb } from "../../core/entites/DbAws/OrderDb";
import { IOrderDbResponsitory } from "../../core/ports/IDbResponsitory";
import {Result } from './dasd';

const aws = require('aws-sdk');

aws.config.update({
    accessKeyId: 'AKIAWFIPTABP4OKJ74WO',
    secretAccessKey: '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',
    region: 'ap-southeast-2'
  });
const dynamodb = new aws.DynamoDB();  




export class InOrderDbRespository implements IOrderDbResponsitory{
    private OrderDb:OrderDb[] = [];
    
    private params = {
        TableName: "Order" 
    }

    async addOrder(value: OrderDb):Promise<any> {
       
        const result:Result = new Result();
        const params = {
            TableName : "Order",
            Item :{
                Order_id:{S:value.Order_id},
                Order_name:{S:value.Order_name}

            },
            ConditionExpression: "attribute_not_exists(Order_id)"
        }
        try{
           
            await dynamodb.putItem(params).promise();
            result.statusCode = "Success";
            result.statusCodeNumber = 200;
        }catch(err:any){
            if (err.code === "ConditionalCheckFailedException") {
                console.error("❌ Error: Order_id already exists!");
            } else {
                console.error("❌ Error:", err);
            }
        }
        console.log("res :",result)
        return result
       
        
       
    }
    addOrders(value:OrderDb[]):void{

    }

    async readAll(): Promise<OrderDb[]> {
        try {
            const data = await dynamodb.scan(this.params).promise();
            
            this.OrderDb = (data.Items as OrderDb[]).map(
                (item: OrderDb) => new OrderDb(item.Order_id, item.Order_name)
            );
            
            console.log("Data in table:", JSON.stringify(this.OrderDb, null, 2));
            return this.OrderDb;
        } catch (err) {
            console.error("Error scanning table:", JSON.stringify(err, null, 2));
            return [];
        }
    }
}