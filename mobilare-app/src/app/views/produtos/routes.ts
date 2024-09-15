import { Routes } from '@angular/router';

const rootProdutos: string = 'gerenciar-produtos'

export const routes: Routes = [
  {
    path: rootProdutos,
    loadComponent: () => import('./produto-list/produto-list.component').then(m => m.ProdutoListComponent),
    data: {
      title: 'Produtos'
    }
  },
  {
    path: rootProdutos + '/cadastrar',
    loadComponent: () => import('./produto-ce/produto-ce.component').then(m => m.ProdutoCeComponent),
    data: {
      title: 'Cadastrar Produto'
    }
  },
  {
    path: rootProdutos + '/editar/:code',
    loadComponent: () => import('./produto-ce/produto-ce.component').then(m => m.ProdutoCeComponent),
    data: {
      title: 'Editar Produto'
    }
  },
  // {
  //   path: rootProdutos + '/visualizar/:id',
  //   loadComponent: () => import('./inventario-ce/inventario-ce.component').then(m => m.InventarioCeComponent),
  //   data: {
  //     title: 'Visualizar Produto'
  //   }
  // }
];

