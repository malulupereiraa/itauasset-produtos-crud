import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Produto } from '../../../@core/models/produto.model';
import { ProdutoService } from '../produto.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherCheck, featherPlus, featherX } from '@ng-icons/feather-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, MatPaginatorModule, MatTableModule, MatButtonModule, MatDividerModule, MatIconModule, NgbAccordionModule, MatProgressSpinnerModule, NgIconComponent],
  viewProviders: [provideIcons({ featherPlus, featherX, featherCheck })],
  templateUrl: './produto-list.component.html',
  styleUrl: './produto-list.component.scss'
})
export class ProdutoListComponent {
  produtos: Produto[] = [];
  categories: string[] = ['Atacado', 'Varejo', 'Internacional', 'Todos'];
  selectedCategory = 'Todos';
  searchCode = '';
  displayedColumns: string[] = ['actions', 'codigo', 'nome', 'categoria'];
  dataSource: any = new MatTableDataSource<Produto>();
  closeResult = '';

  @ViewChild(MatPaginator) paginator: MatPaginator | any;


  @ViewChild('content')
  private modalConfirmDelete: TemplateRef<any> | undefined | any;

  idToManipulate: any;
  pageSize: number = 5;
  currentPage: number = 0;
  totalSize: number = 0;
  pageLength: number = 0;
  loading: boolean = true;

  private modalService = inject(NgbModal);
  private router = inject(Router);
  private produtoService = inject(ProdutoService);
  private toastr = inject(ToastrService);

  constructor(  ) {

  }

  ngOnInit(): void {
    this.loadProdutos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
  }

  showMessage(type: string, message?: string): void {
    switch (type) {
      case 'erro':
        this.toastr.error(message, 'Erro!');
        break;
      default:
        this.toastr.success('Produto Removido com Sucesso!', 'Sucesso!');
        break;
    }
  }

  loadProdutos(): void {
    this.produtoService.getProdutos()
      .subscribe({
        next: (produtos) => {
          this.loading = false;
          setTimeout(() => {
            this.produtos = produtos;
            this.pageLength = this.produtos.length;
            this.dataSource = new MatTableDataSource(this.produtos);
            this.dataSource.paginator = this.paginator;

          }, 500);
        },
        error: (e) => { console.error(e);  this.loading = false;}
      });
  }

  filterProdutos(): void {
    this.produtoService.getProdutos()
    .subscribe({
      next: (produtos) => {
        this.loading = false;
        setTimeout(() => {
          this.produtos = this.produtos = produtos.filter(p =>
            (this.selectedCategory === 'Todos' || p.category === this.selectedCategory) &&
            (this.searchCode === '' || p.code.includes(this.searchCode))
          );
          this.pageLength = this.produtos.length;
          this.dataSource = new MatTableDataSource(this.produtos);
          this.dataSource.paginator = this.paginator;

        }, 500);
      },
      error: (e) => { console.error(e);  this.loading = false;}
    });
  }

  editProduto(code: string): void {
    this.router.navigate([
      'produtos',
      'gerenciar-produtos',
      'editar',
      code,
    ]);
  }

  confirmDelete(code: string): void {
    this.produtoService.deleteProduto(code);
    this.showMessage('sucesso');
    this.loadProdutos();
  }

  deleteProduto(code: any): void {
    this.open(this.modalConfirmDelete);
    this.idToManipulate = code;
  }

  pageEvent(event: any): void {
    this.pageSize = event.pageSize;
  }
}
