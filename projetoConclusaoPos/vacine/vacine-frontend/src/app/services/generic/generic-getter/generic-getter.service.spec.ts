import { TestBed } from '@angular/core/testing';

import { GenericGetterService } from './generic-getter.service';

describe('GenericGetterService', () => {
  let service: GenericGetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericGetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
