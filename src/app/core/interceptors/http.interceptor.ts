import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let messsage = 'Ismeretlen hiba történt.'

      if (error.error instanceof ErrorEvent) {
        messsage = `Kliens oldali hiba: ${error.error.message}`;
      } else if(error.status === 0) {
        messsage = 'Nem sikerül csatlakozni a szerverhez.';
      } else {
        messsage = `Szerver hiba (${error.status}): ${error.message}`;
      }

      notificationService.unsuccess(messsage);
      return throwError(() => error);
    })
  );
};
