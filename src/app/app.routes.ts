import { Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductFormComponent } from './products/product-form/product-form.component';

export const routes: Routes = [
    { path: 'products', component: ProductListComponent },
    { path: 'add', component: ProductFormComponent },
    { path: 'edit/:id', component: ProductFormComponent },
    { path: '', redirectTo: '/products', pathMatch: "full" }
];
