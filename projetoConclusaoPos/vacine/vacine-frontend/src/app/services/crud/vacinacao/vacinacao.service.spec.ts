import { TestBed } from '@angular/core/testing';

import { VacinacaoService } from './vacinacao.service';

describe('VacinacaoService', () => {
  let service: VacinacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacinacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
