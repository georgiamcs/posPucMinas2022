import { TestBed } from '@angular/core/testing';

import { CompraVacinaService } from './compra-vacina.service';

describe('CompraVacinaService', () => {
  let service: CompraVacinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompraVacinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
