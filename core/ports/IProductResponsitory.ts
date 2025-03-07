import { Product } from "../entites/product";


export interface IProductRepository {
  add(product: Product): void;
  getOrderById(id:number):Product;
  getAll(): Product[];
}