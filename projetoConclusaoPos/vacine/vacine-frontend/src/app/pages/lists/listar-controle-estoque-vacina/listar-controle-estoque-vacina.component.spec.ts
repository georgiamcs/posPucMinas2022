import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarControleEstoqueVacinaComponent } from './listar-controle-estoque-vacina.component';

describe('ListarControleEstoqueVacinaComponent', () => {
  let component: ListarControleEstoqueVacinaComponent;
  let fixture: ComponentFixture<ListarControleEstoqueVacinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarControleEstoqueVacinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarControleEstoqueVacinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
