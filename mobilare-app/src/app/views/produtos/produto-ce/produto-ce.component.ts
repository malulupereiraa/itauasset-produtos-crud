import { Component, inject } from '@angular/core';
import { Produto } from '../../../@core/models/produto.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../produto.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherArrowLeft, featherSave } from '@ng-icons/feather-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-produto-ce',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, NgIconComponent],
  viewProviders: [provideIcons({ featherSave, featherArrowLeft })],
  templateUrl: './produto-ce.component.html',
  styleUrl: './produto-ce.component.scss'
})
export class ProdutoCeComponent {

  produto: Produto = { code: '', name: '', category: '' };
  categorias: string[] = ['Atacado', 'Varejo', 'Internacional'];
  editMode: boolean = false;
  produtos: Produto[] = [];

  private produtoService = inject(ProdutoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  constructor() { }

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      this.produtoService.getProduto(code).subscribe(produto => {
        if (produto) {
          this.produto = produto;
        }
      });
    }

    code ? this.editMode = true : this.editMode = false;
  }

  showMessage(type: string, message?: string): void {
    switch (type) {
      case 'erro':
        this.toastr.error(message, 'Erro!');
        break;
      case 'sucessoEdit':
        this.toastr.success(message, 'Sucesso!');
        break;
      default:
        this.toastr.success('Produto Adicionado com Sucesso!', 'Sucesso!');
        break;
    }
  }

  saveProduct(): void {
    if (this.editMode) {
      this.produtoService.updateProduto(this.produto.code, this.produto);
      this.showMessage('sucessoEdit', 'Produto Editado com Sucesso!');
      this.editMode = false;
      this.router.navigate(['/produtos/gerenciar-produtos']);
    } else {
      this.produtoService.getProdutos()
      .subscribe({
        next: (produtos) => {
          if (produtos.find(produto => produto.code === this.produto.code) !== undefined) {
            this.showMessage('erro', 'O código digitado já existe no sistema! Por favor, informe outro!');
          } else {
            this.produtoService.addProduto(this.produto);
            this.showMessage('sucesso');
            this.router.navigate(['/produtos/gerenciar-produtos']);
          }
        },
        error: (e) => { console.error(e);}
      });
    }
  }

  goBack(): void {
    this.editMode = false;
    this.router.navigate(['/produtos/gerenciar-produtos']);
  }

}
