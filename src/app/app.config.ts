import { ApplicationConfig } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { credsInterceptor } from './core/interceptors/creds.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNoopAnimations(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([credsInterceptor, loadingInterceptor])),
  ],
};
