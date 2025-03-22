import { createProductController } from "./adapters/controller/ProductController";
import { createCustomerController } from "./adapters/controller/CustomerController";
import { createEmployeeController } from "./adapters/controller/EmployeeController";

import { ProductService } from "./core/services/ProductService";
import { CustomerService } from "./core/services/CustomerService";
import { OrderDbService} from "./core/services/DbAws/OrderDbService";
import { EmployeeService } from "./core/services/DbAws/EmployeeService";


import { InMemoryProductRepository } from "./adapters/respositories/InMemoryProductRepository"; 
import { InMemoryCustomerRepository } from "./adapters/respositories/InMemoryCustomerRepository"; 
import { InPostgresqlProductRepository } from "./adapters/postgresql/postgresql"; 
import  { InPostgresqlEmployeeRepository } from "./adapters/postgresql/EmployeePostgresAdapter"; 
import express from "express";
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

// ✅ เชื่อม Express กับ Controller

app.use("/products", createProductController(productPostgresqlService));
app.use("/customers", createCustomerController(customerService));
app.use("/employees",createEmployeeController(employeePostgresqlService));

app.listen(4000,'0.0.0.0', () => console.log("Server running on port 4000"));