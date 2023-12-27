import { Injectable } from '@angular/core';
import { PeraWalletConnect } from "@perawallet/connect";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PeraService {
  private wallet = new PeraWalletConnect({ shouldShowSignTxnToast: false });

  private _currentAccountAddress: string | null = null;

  private _accountAddress = new BehaviorSubject<string | null>(this._currentAccountAddress);
  public accountAddress = this._accountAddress.asObservable();

  constructor() {
    this.wallet.reconnectSession()
      .then((accounts) => {
        this.onConnect(accounts[0]);
      })
      .catch(e => {
        console.log("reconnectSession", e);
      });
  }

  connect() {
    return this.wallet.connect()
      .then((newAccounts) => {
        this.onConnect(newAccounts[0]);
      })
  }

  private onConnect(accountAddress: string) {
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
  }
}
