import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  isSidenavOpen = true;
  currentYear = new Date().getFullYear();
  userName!: string | undefined;

  constructor(private authenticationService: AuthenticationService) {
    this.userName = this.authenticationService.getUser()?.username;
  }

  switchMenuSize() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  logout() {
    this.authenticationService.logout();
  }
}
