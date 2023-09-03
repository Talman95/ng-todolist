import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'todos',
    loadComponent: () => import('./features/todos/todos.component').then(m => m.TodosComponent),
  },
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: '**', redirectTo: '/todos', pathMatch: 'full' },
];
