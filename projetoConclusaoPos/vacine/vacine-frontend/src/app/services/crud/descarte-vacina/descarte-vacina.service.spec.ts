import { TestBed } from '@angular/core/testing';

import { DescarteVacinaService } from './descarte-vacina.service';

describe('DescarteVacinaService', () => {
  let service: DescarteVacinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescarteVacinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
