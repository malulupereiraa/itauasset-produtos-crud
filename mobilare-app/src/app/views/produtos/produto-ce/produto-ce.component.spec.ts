import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCeComponent } from './produto-ce.component';

describe('ProdutoCeComponent', () => {
  let component: ProdutoCeComponent;
  let fixture: ComponentFixture<ProdutoCeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoCeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdutoCeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
