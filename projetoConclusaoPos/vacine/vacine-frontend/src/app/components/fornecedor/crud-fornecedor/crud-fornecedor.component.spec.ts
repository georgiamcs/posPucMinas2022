import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudFornecedorComponent } from './crud-fornecedor.component';

describe('CrudFornecedorComponent', () => {
  let component: CrudFornecedorComponent;
  let fixture: ComponentFixture<CrudFornecedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudFornecedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
