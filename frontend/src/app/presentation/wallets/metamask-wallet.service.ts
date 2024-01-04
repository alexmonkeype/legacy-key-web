import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Web3 from 'web3';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class MetamaskWalletService {
  private wallet: Web3 | null = null;
  private chainIds: string[] = ['0x1'];

  private _currentAccountAddress: string | null = null;

  private _accountAddress = new BehaviorSubject<string | null>(this._currentAccountAddress);
  public accountAddress = this._accountAddress.asObservable();

  constructor() {
    if (typeof window.ethereum !== 'undefined') {
      this.wallet = new Web3(window.ethereum);
    }
  }

  connect = async (): Promise<void> => {
    const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts && accounts.length > 0 && accounts[0]) {
      this.setAccountAddress(accounts[0]);
    }
  }

  private setAccountAddress(accountAddress: string | null) {
    this._currentAccountAddress = accountAddress;
    this._accountAddress.next(accountAddress);
  }

  getAccountAddress() {
    return this._currentAccountAddress;
  }
}
