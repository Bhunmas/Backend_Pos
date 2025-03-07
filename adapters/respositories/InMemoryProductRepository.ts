import { IProductRepository } from "../../core/ports/IProductResponsitory";
import { Product } from "../../core/entites/product";

export class InMemoryProductRepository implements IProductRepository {
  private products: Product[] = [];

  add(product: Product): void {
    this.products.push(product);
  }

  getAll(): any[] {
    console.log("Data in repository:", Array.from(this.products.values()));
    return Array.from(this.products.values()).map(product => product.toJSON());
  }

  getOrderById(id:number):Product{
    return this.products[id];
  }
}