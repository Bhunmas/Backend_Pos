import { createProductController } from "./adapters/controller/ProductController";
import { createCustomerController } from "./adapters/controller/CustomerController";
import { createEmployeeController } from "./adapters/controller/EmployeeController";
import { createTransactionController } from "./adapters/controller/TransactionController";
import {  createMaterialController} from "./adapters/controller/MaterialController";
import {  createSupplyController } from "./adapters/controller/SupplyController";
import { createVendor_materialController  } from "./adapters/controller/Vendor_MaterialController";
import { createSupplierOrderHistoryController  } from "./adapters/controller/SupplyOrderHistoryController";


import { ProductService } from "./core/services/ProductService";
import { CustomerService } from "./core/services/CustomerService";
import { OrderDbService} from "./core/services/DbAws/OrderDbService";
import { EmployeeService } from "./core/services/DbAws/EmployeeService";
import { TransactionService } from "./core/services/DbAws/TransactionService";
import { MaterialService } from "./core/services/DbAws/MaterialService";
import { SuppliersService } from "./core/services/DbAws/SuppliersService";
import { Vendor_MaterialService } from "./core/services/DbAws/Vendor_MaterialService";
import { SupplierOrderHistoryService } from "./core/services/DbAws/SupplierOrderHistory";
import { AuthorizationService } from "./core/services/utility/AuthorizationService";


import { InMemoryProductRepository } from "./adapters/respositories/InMemoryProductRepository"; 
import { InMemoryCustomerRepository } from "./adapters/respositories/InMemoryCustomerRepository"; 
import { InPostgresqlProductRepository } from "./adapters/postgresql/postgresql"; 
import  { InPostgresqlEmployeeRepository } from "./adapters/postgresql/EmployeePostgresAdapter"; 
import  { InPostgresqlTransactionRepository } from "./adapters/postgresql/TransactionPostgresAdapter"; 
import  {  InPostgresqlMaterialRepository } from "./adapters/postgresql/MaterialPostgresAdapter"; 
import  {  InPostgresqlSuppliersRepository } from "./adapters/postgresql/SupplyPostgresAdapter"; 
import  {  InPostgresqlVendor_MaterialRepository } from "./adapters/postgresql/Vendor_MaterialPostgresAdapter"; 
import  {  InPostgresqlSupplierHistoryRepository } from "./adapters/postgresql/SupplierOrderHistoryPostgresAdapter"; 
import  {  AuthorizationAdapter } from "./adapters/utility/AuthorizationAdapter"; 
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

const customerRepository = new InMemoryCustomerRepository();
const customerService = new CustomerService(customerRepository);

const vendor_materialRepository = new InPostgresqlVendor_MaterialRepository();
const vendor_materialService = new Vendor_MaterialService(vendor_materialRepository);

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



const suppliersPostgresqlRespository = new InPostgresqlSuppliersRepository();
const suppliersPostgresqlService = new SuppliersService(suppliersPostgresqlRespository);

const supplierOrderHistoryPostgresqlRespository = new InPostgresqlSupplierHistoryRepository();
const supplierOrderHistoryPostgresqlService = new SupplierOrderHistoryService(supplierOrderHistoryPostgresqlRespository)

// ✅ สร้าง Controller
const authorizationResponsitory = new AuthorizationAdapter(process.env.JWT_SECRET,"1h");
const authorizationService = new AuthorizationService(authorizationResponsitory);
// ✅ เชื่อม Express กับ Controller

app.use("/products", createProductController(productPostgresqlService,authorizationService));
app.use("/customers", createCustomerController(customerService,authorizationService));
app.use("/employees",createEmployeeController(employeePostgresqlService,authorizationService));
app.use('/transactions', createTransactionController(transactionPostgresqlService,authorizationService));
app.use('/materials',createMaterialController(materialPostgresqlService,authorizationService));
app.use('/suppliers',createSupplyController(suppliersPostgresqlService,authorizationService));
app.use('/vendor_material',createVendor_materialController(vendor_materialService,authorizationService));
app.use('/supplierorderhistory',createSupplierOrderHistoryController(supplierOrderHistoryPostgresqlService,authorizationService));








app.listen(4000,'0.0.0.0', () => console.log("Server running on port 4000"));