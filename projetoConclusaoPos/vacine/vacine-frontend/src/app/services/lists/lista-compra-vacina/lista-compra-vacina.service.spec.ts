import { TestBed } from '@angular/core/testing';

import { ListaCompraVacinaService } from './lista-compra-vacina.service';

describe('CompraVacinaService', () => {
  let service: ListaCompraVacinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaCompraVacinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
