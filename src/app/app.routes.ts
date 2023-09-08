import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'todos',
    loadComponent: () => import('./features/todos/todos.component').then(m => m.TodosComponent),
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: '**', redirectTo: '/todos', pathMatch: 'full' },
];
