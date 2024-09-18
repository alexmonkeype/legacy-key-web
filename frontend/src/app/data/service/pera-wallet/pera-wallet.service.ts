import { Injectable } from '@angular/core';
//import { PeraWalletConnect } from "@perawallet/connect";
import { BehaviorSubject, Observable } from "rxjs";
import { WalletRepository } from '../../../domain/repository/wallet.repository';


@Injectable({
  providedIn: 'root'
})
export class PeraWalletService extends WalletRepository {
  //private wallet = new PeraWalletConnect({ shouldShowSignTxnToast: false });

  /* private _currentAccountAddress: string | null = null;

  private _accountAddress = new BehaviorSubject<string | null>(this._currentAccountAddress);
  public accountAddress = this._accountAddress.asObservable(); */

  constructor() {
    super();

    /* this.wallet.reconnectSession()
      .then((accounts) => {
        this.onConnect(accounts[0]);
      })
      .catch(e => {
        console.log("reconnectSession", e);
      }); */
  }

  connect(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      /* this.wallet.connect()
        .then((accounts) => {
          //this.onConnect(accounts[0]);
          resolve(accounts);
        })
        .catch(err => reject(err)); */
    });
  }

  /* private onConnect(accountAddress: string) {
    const self = this;
    this.wallet.connector?.on("disconnect", () => {
      self.wallet?.disconnect()
        .catch(e => {
          console.log("handleDisconnectWalletClick", e);
        });
      self.setAccountAddress(null);
    });
    this.setAccountAddress(accountAddress);
  }

  private setAccountAddress(accountAddress: string | null) {
    this._currentAccountAddress = accountAddress;
    this._accountAddress.next(accountAddress);
  }

  getAccountAddress() {
    return this._currentAccountAddress;
  } */
}
