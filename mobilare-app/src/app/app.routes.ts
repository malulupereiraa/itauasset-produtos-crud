import { Routes } from '@angular/router';
import { ProdutoListComponent } from './views/produtos/produto-list/produto-list.component';
import { ProdutoCeComponent } from './views/produtos/produto-ce/produto-ce.component';
import { DefaultLayoutComponent } from './@core/components/default-layout/default-layout.component';

export const routes: Routes = [
  // {
  //   path: 'login',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: ''
    },
    children: [
      // {
      //   path: 'home',
      //   loadChildren: () => import('./views/home/routes').then((m) => m.routes)
      // },
      {
        path: 'produtos',
        loadChildren: () => import('./views/produtos/routes').then((m) => m.routes)
      },
    ]
  },
  // {
  //   path: 'login',
  //   loadComponent: () => import('./views/login/login.component').then(m => m.LoginComponent),
  //   data: {
  //     title: 'Login'
  //   }
  // },
  { path: '**', redirectTo: '/' }
];
