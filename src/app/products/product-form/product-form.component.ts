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
    id: 0,
    name: '',
    price: 0
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      const existingProduct = this.productService.get(id);
      if (existingProduct) {
        this.product = { ...existingProduct };
      }
    }
  }

  save(): void {
    if (this.product.id) {
      this.productService.update(this.product);
    } else {
      this.productService.add(this.product);
    }
    this.router.navigate(['/products']);
  }

}
