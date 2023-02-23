import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVacinacoesComponent } from './listar-vacinacoes.component';

describe('ListarVacinacoesComponent', () => {
  let component: ListarVacinacoesComponent;
  let fixture: ComponentFixture<ListarVacinacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarVacinacoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarVacinacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
