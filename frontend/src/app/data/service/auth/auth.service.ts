import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PeraWalletService } from '../pera-wallet/pera-wallet.service';
import { MetamaskWalletService } from '../metamask-wallet/metamask-wallet.service';
import { WalletRepository } from '../../../domain/repository/wallet.repository';
import { Web3Wallet } from '../../../domain/type/web3-wallet.type';
import { Account } from '../../../domain/model/account.model';
//import { Account } from 'algosdk/dist/types/src/client/v2/algod/models/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentAccountAddress: string | null = null;

  private _accountAddress = new BehaviorSubject<string | null>(this._currentAccountAddress);
  public accountAddress = this._accountAddress.asObservable();

  constructor(
    private peraWallet: PeraWalletService,
    private metamaskWallet: MetamaskWalletService
  ) {
  }

  connect(wallet: Web3Wallet): Promise<string[]> {
    return new Promise<string[]>(async (resolve, reject) => {
      switch (wallet) {
        case "pera": {
          const accounts = await this.peraWallet.connect();
          this.setAccountAddress(accounts[0]);
          resolve(accounts);
          break;
        }
        case "metamask": {
          const accounts = await this.metamaskWallet.connect();
          this.setAccountAddress(accounts[0]);
          resolve(accounts);
          break;
        }
        default:
          break;
      }
    });
  }

  private setAccountAddress(accountAddress: string | null) {
    this._currentAccountAddress = accountAddress;
    this._accountAddress.next(accountAddress);
  }

  getAccountAddress(): string | null {
    return this._currentAccountAddress;
  }

  getAccount(): Promise<Account> {
    const acc: Account = {
      address: this._currentAccountAddress
    };
    return Promise.resolve(acc);
  }
}
