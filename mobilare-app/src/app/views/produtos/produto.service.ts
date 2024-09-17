import { Injectable } from '@angular/core';
import { Produto } from '../../@core/models/produto.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor() {
  }

  private produtos: Produto[] = [
    { code: '001', name: 'Produto 1', category: 'Atacado' },
    { code: '002', name: 'Produto 2', category: 'Varejo' },
    { code: '003', name: 'Produto 3', category: 'Internacional' },
    { code: '004', name: 'Produto 4', category: 'Internacional' },
    { code: '005', name: 'Produto 5', category: 'Varejo' }
  ];

  getProdutos(): Observable<Produto[]> {
    return of(this.produtos);
  }

  getProduto(code: string): Observable<Produto | undefined> {
    return of(this.produtos.find(p => p.code === code));
  }

  addProduto(Produto: Produto): void {
    this.produtos.push(Produto);
  }

  updateProduto(code: string, updatedProduto: Partial<Produto>): void {
    const index = this.produtos.findIndex(p => p.code === code);
    if (index !== -1) {
      this.produtos[index] = { ...this.produtos[index], ...updatedProduto };
    }
  }

  deleteProduto(code: string): void {
    this.produtos = this.produtos.filter(p => p.code !== code);
  }
}
