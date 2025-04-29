import { Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './core/components/login/login.component';
import { RegistrationComponent } from './core/components/registration/registration.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'products', component: ProductListComponent },
            { path: 'products/add', component: ProductFormComponent },
            { path: 'products/edit/:id', component: ProductFormComponent },
            { path: '', redirectTo: '/products', pathMatch: "full" }
        ]
    },
    { path: '', redirectTo: '/login', pathMatch: "full" }
];
