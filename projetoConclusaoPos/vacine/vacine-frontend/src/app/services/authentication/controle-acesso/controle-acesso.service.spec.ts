import { TestBed } from '@angular/core/testing';

import { ControleAcessoService } from './controle-acesso.service';

describe('ControleAcessoService', () => {
  let service: ControleAcessoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControleAcessoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
