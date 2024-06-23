import { TestBed } from '@angular/core/testing';
import { ExchangeService } from './exchange.service';

describe('ExchangeService', () => {
  let service: ExchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the exchange rate', () => {
    service.getRate('eth/usd').then(rate => {
      expect(rate).toBeInstanceOf(Number);
    });
  });
});
