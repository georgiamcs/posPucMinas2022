import { TestBed } from '@angular/core/testing';

import { ListaDescarteVacinaService } from './lista-descarte-vacina.service';

describe('ListaDescarteVacinaService', () => {
  let service: ListaDescarteVacinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaDescarteVacinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
