import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private matSnackBar: MatSnackBar) { }

  success(messsage: string): void {
    this.matSnackBar.open(messsage, 'OK', { duration: 3000 });
  }

  unsuccess(messsage: string): void {
    this.matSnackBar.open(messsage, 'Bezár', { duration: 5000 });
  }

}
