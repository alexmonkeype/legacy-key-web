import { TestBed } from '@angular/core/testing';

import { PeraService } from './pera.service';

describe('PeraService', () => {
  let service: PeraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
