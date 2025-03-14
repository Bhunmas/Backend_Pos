import { createProductController } from "./adapters/controller/ProductController";
import { createCustomerController } from "./adapters/controller/CustomerController";


import { ProductService } from "./core/services/ProductService";
import { CustomerService } from "./core/services/CustomerService";
import { OrderDbService} from "./core/services/DbAws/OrderDbService";

import { InOrderDbRespositoryDB } from "./adapters/aws-amazon-db/InOrderDbRespositoryDB";
import { InMemoryProductRepository } from "./adapters/respositories/InMemoryProductRepository"; 
import { InMemoryCustomerRepository } from "./adapters/respositories/InMemoryCustomerRepository"; 
import { InPostgresqlProductRepository } from "./adapters/postgresql/postgresql"; 
import express from "express";



const app = express();

app.use(express.json());
// ✅ สร้าง Repository และ Service
const productRepository = new InMemoryProductRepository();
const productService = new ProductService(productRepository);
const customerRepository = new InMemoryCustomerRepository();
const customerService = new CustomerService(customerRepository);

const orderRepository = new InOrderDbRespositoryDB();
const orderService = new OrderDbService(orderRepository);

const productPostgresqlRepository = new InPostgresqlProductRepository();
const productPostgresqlService = new OrderDbService(productPostgresqlRepository);


// ✅ เชื่อม Express กับ Controller

app.use("/products", createProductController(productService,orderService,productPostgresqlService));
app.use("/customers", createCustomerController(customerService));

app.listen(3000,'0.0.0.0', () => console.log("Server running on port 3000"));