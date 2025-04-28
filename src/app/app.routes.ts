import { Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { LayoutComponent } from './core/components/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'products', component: ProductListComponent },
            { path: 'products/add', component: ProductFormComponent },
            { path: 'products/edit/:id', component: ProductFormComponent },
            { path: '', redirectTo: '/products', pathMatch: "full" }
        ]
    }
];
