import { createProductController } from "./adapters/controller/ProductController";
import { createCustomerController } from "./adapters/controller/CustomerController";
import { createEmployeeController } from "./adapters/controller/EmployeeController";
import { createTransactionController } from "./adapters/controller/TransactionController";
import {  createMaterialController} from "./adapters/controller/MaterialController";


import { ProductService } from "./core/services/ProductService";
import { CustomerService } from "./core/services/CustomerService";
import { OrderDbService} from "./core/services/DbAws/OrderDbService";
import { EmployeeService } from "./core/services/DbAws/EmployeeService";
import { TransactionService } from "./core/services/DbAws/TransactionService";
import { MaterialService } from "./core/services/DbAws/MaterialService";

import { InMemoryProductRepository } from "./adapters/respositories/InMemoryProductRepository"; 
import { InMemoryCustomerRepository } from "./adapters/respositories/InMemoryCustomerRepository"; 
import { InPostgresqlProductRepository } from "./adapters/postgresql/postgresql"; 
import  { InPostgresqlEmployeeRepository } from "./adapters/postgresql/EmployeePostgresAdapter"; 
import  { InPostgresqlTransactionRepository } from "./adapters/postgresql/TransactionPostgresAdapter"; 
import  {  InPostgresqlMaterialRepository } from "./adapters/postgresql/MaterialPostgresAdapter"; 

import express from "express";
import { create } from "node:domain";
const cors = require('cors');



const app = express();
const configCors = {
    origin: process.env.CORS_CONFIG
}

app.use(cors(configCors));
app.use(express.json());
// ✅ สร้าง Repository และ Service
const productRepository = new InMemoryProductRepository();
const productService = new ProductService(productRepository);
const customerRepository = new InMemoryCustomerRepository();
const customerService = new CustomerService(customerRepository);

// const orderRepository = new InOrderDbRespositoryDB();
// const orderService = new OrderDbService(orderRepository);

const productPostgresqlRepository = new InPostgresqlProductRepository();
const productPostgresqlService = new OrderDbService(productPostgresqlRepository);

const employeePostgresqlRepository = new InPostgresqlEmployeeRepository();
const employeePostgresqlService = new EmployeeService(employeePostgresqlRepository);

const transactionPostgresqlRespository = new InPostgresqlTransactionRepository();
const transactionPostgresqlService = new TransactionService(transactionPostgresqlRespository);

const materialPostgresqlRespository = new InPostgresqlMaterialRepository();
const materialPostgresqlService = new MaterialService(materialPostgresqlRespository);

// ✅ สร้าง Controller

// ✅ เชื่อม Express กับ Controller

app.use("/products", createProductController(productPostgresqlService));
app.use("/customers", createCustomerController(customerService));
app.use("/employees",createEmployeeController(employeePostgresqlService));
app.use('/transactions', createTransactionController(transactionPostgresqlService));
app.use('/materials',createMaterialController(materialPostgresqlService));




app.listen(4000,'0.0.0.0', () => console.log("Server running on port 4000"));