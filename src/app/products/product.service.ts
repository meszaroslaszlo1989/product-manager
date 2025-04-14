import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getAll(): Promise<Product[]> {
    return firstValueFrom(this.http.get<Product[]>(this.apiUrl));
  }

  get(id: string): Promise<Product | undefined> {
    return firstValueFrom(this.http.get<Product>(`${this.apiUrl}/${id}`));
  }

  add(product: Product): Promise<Product> {
    product.id = Guid.create().toString();
    return firstValueFrom(this.http.post<Product>(this.apiUrl, product));
  }

  update(product: Product): Promise<Product> {
    return firstValueFrom(this.http.put<Product>(`${this.apiUrl}/${product.id}`, product));
  }

  delete(id: string): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }
}
