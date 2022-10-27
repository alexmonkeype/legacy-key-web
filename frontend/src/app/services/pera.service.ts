import {Injectable} from '@angular/core';
import {PeraWalletConnect} from "@perawallet/connect";
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class PeraService {
    private wallet = new PeraWalletConnect();

    private _currentAccountAddress: string | null = null;

    private _accountAddress = new BehaviorSubject<string | null>(this._currentAccountAddress);
    public accountAddress = this._accountAddress.asObservable();

    constructor() {
        this.wallet.reconnectSession()
            .then((accounts) => {
                if (accounts.length) {

                    this.onConnect(accounts[0]);
                }
            });
    }

    connect() {
        return this.wallet.connect()
            .then((newAccounts) => {
                this.onConnect(newAccounts[0]);
            })
    }

    private onConnect(accountAddress: string) {
        this.wallet.connector?.on("disconnect", this.handleDisconnectWalletClick);
        this.setAccountAddress(accountAddress);
    }

    private setAccountAddress(accountAddress: string | null) {
        this._currentAccountAddress = accountAddress;
        this._accountAddress.next(accountAddress);
    }

    getAccountAddress()  {
        return this._currentAccountAddress;
    }

    private handleDisconnectWalletClick() {
        this.wallet.disconnect();
        this.setAccountAddress(null);
    }
}
