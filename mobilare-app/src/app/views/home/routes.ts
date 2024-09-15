import { Routes } from '@angular/router';

const rootHome: string = ''

export const routes: Routes = [
  {
    path: rootHome,
    loadComponent: () => import('./home.component').then(m => m.HomeComponent),
    data: {
      title: 'Home'
    }
  },
];

