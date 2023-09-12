import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotifyService } from '../services/notify.service';
import { EMPTY, catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifyService = inject(NotifyService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      notifyService.showError(err.message);
      return EMPTY;
    })
  );
};
