import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Laptop',
      price: 1500000,
      description: "Ez egy leírás"
    },
    {
      id: 2,
      name: 'Telefon',
      price: 1000000
    },
    {
      id: 3,
      name: 'Fejhallagtó',
      price: 15000,
      description: "Ez egy leírás"
    },
    {
      id: 4,
      name: 'Pendrive',
      price: 10000
    },
  ];

  constructor() { }

  getAll(): Product[] {
    return [...this.products];
  }

  get(id:number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  add(product: Product): void {
    this.products.push({ ...product, id: Date.now() });
  }

  update(product: Product): void {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index > -1) {
      this.products[index] = product;
    }
  }

  delete(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
  }
}
