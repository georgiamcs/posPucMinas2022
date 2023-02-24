import { TestBed } from '@angular/core/testing';

import { ListaControleEstoqueVacinaService } from './lista-controle-estoque-vacina.service';

describe('ListaControleEstoqueVacinaService', () => {
  let service: ListaControleEstoqueVacinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaControleEstoqueVacinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
