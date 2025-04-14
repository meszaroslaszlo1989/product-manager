import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  product: Product = {
    id: "",
    name: '',
    price: 0
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getProduct(id);
    }
  }

  async save() {
    if (this.product.id) {
      try {
        await this.productService.update(this.product);
        this.router.navigate(['/products']);
      } catch (error) {
        console.error(error);
      }

    } else {
      try {
        await this.productService.add(this.product);
        this.router.navigate(['/products']);
      } catch (error) {
        console.error(error);
      }
    }
  }

  private async getProduct(id: string) {
    try {
      const existingProduct = await this.productService.get(id);
      if (existingProduct) {
        this.product = { ...existingProduct };
      }
    } catch (error) {
      console.error(error);
    }
  }
}
