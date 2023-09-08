import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const credsInterceptor: HttpInterceptorFn = (req, next) => {
  const request = req.clone({
    withCredentials: true,
    setHeaders: { 'API-KEY': environment.apiKey },
  });

  return next(request);
};
