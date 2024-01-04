import { TestBed } from '@angular/core/testing';

import { PeraWalletService } from './pera-wallet.service';

describe('PeraService', () => {
  let service: PeraWalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeraWalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
