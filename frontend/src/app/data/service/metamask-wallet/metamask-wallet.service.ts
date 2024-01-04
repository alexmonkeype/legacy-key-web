import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Web3 from 'web3';
import { WalletRepository } from '../../../domain/repository/wallet.repository';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class MetamaskWalletService extends WalletRepository {
  /* private wallet: Web3 | null = null;

  private _currentAccountAddress: string | null = null;

  private _accountAddress = new BehaviorSubject<string | null>(this._currentAccountAddress);
  public accountAddress = this._accountAddress.asObservable(); */

  constructor() {
    super();

    /* if (typeof window.ethereum !== 'undefined') {
      this.wallet = new Web3(window.ethereum);
    } */
  }

  connect = (): Promise<string[]> => {
    return new Promise<string[]>(async (resolve, reject) => {
      try {
        const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        /* this.setAccountAddress(accounts[0]); */
        resolve(accounts);
      } catch (err) {
        reject(err);
      }
    });
  }

  /* private setAccountAddress(accountAddress: string | null) {
    this._currentAccountAddress = accountAddress;
    this._accountAddress.next(accountAddress);
  }

  getAccountAddress() {
    return this._currentAccountAddress;
  } */
}
