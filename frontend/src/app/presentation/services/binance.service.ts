import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BinanceService {
  private _currentAccountAddress: string | null = null;

  private _accountAddress = new BehaviorSubject<string | null>(this._currentAccountAddress);
  public accountAddress = this._accountAddress.asObservable();

  constructor() { }

  connect = async (): Promise<void> => {
    //TODO: Implementar cnx a wallet de Binanceƒ
    return new Promise((resolve, reject) => {
      this.setAccountAddress("Fake address");
      resolve();
    });
  }

  private setAccountAddress(accountAddress: string | null) {
    this._currentAccountAddress = accountAddress;
    this._accountAddress.next(accountAddress);
  }

  getAccountAddress() {
    return this._currentAccountAddress;
  }
}
