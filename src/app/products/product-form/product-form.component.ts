import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  formGroup!: FormGroup;
  existingProduct!: Product;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]]
    });
    this.getProduct();
  }

  async save() {
    if (this.formGroup.invalid) return;
    const product = { ...this.formGroup.value };
    try {
      if (this.existingProduct?.id) {
        product.id = this.existingProduct.id;
        await this.productService.update(product);
      } else {
        await this.productService.add(product);
      }
      await this.router.navigate(['/products']);
    } catch (error) {
      console.error('Hiba történt a mentés közben.')
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.formGroup.get(controlName);
    return !!(control && control.touched && control.hasError(errorName));
  }

  private async getProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      try {
        this.existingProduct = await this.productService.getById(id);
        if (this.existingProduct) {
          this.formGroup.patchValue(this.existingProduct);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
