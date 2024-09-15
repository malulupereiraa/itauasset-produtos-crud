import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './@core/components/default-layout/default-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: ''
    },
    children: [
      {
        path: 'home',
        loadChildren: () => import('./views/home/routes').then((m) => m.routes)
      },
      {
        path: 'produtos',
        loadChildren: () => import('./views/produtos/routes').then((m) => m.routes)
      },
    ]
  },
  { path: '**', redirectTo: '/home' }
];
