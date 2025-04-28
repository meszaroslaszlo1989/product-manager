import { Component, ViewChild } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-product-list',
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  displayedColumns: string[] = ['name', 'price', 'actions'];
  dataSource = new MatTableDataSource<Product>();
  pageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService, private notificationService: NotificationService) {
    if (Number(localStorage.getItem('pageSize')) > 0) {
      this.pageSize = Number(localStorage.getItem('pageSize'));
    }
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(id: string) {
    this.productService.delete(id);
    this.notificationService.success('Sikeres törlés');
    this.loadProducts();
  }

  handlePageEvent($event: PageEvent) {
    localStorage.setItem('pageSize', $event.pageSize.toString());
  }

  private async loadProducts() {
    this.dataSource.data = await this.productService.getAll();
  }

}
