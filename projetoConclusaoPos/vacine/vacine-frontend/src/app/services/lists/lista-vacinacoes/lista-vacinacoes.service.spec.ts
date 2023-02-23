import { TestBed } from '@angular/core/testing';

import { ListaVacinacoesService } from './lista-vacinacoes.service';

describe('ListaVacinacoesService', () => {
  let service: ListaVacinacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaVacinacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
