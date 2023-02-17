import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFornecedoresComponent } from './listar-fornecedores.component';

describe('ListarFornecedoresComponent', () => {
  let component: ListarFornecedoresComponent;
  let fixture: ComponentFixture<ListarFornecedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarFornecedoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarFornecedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
