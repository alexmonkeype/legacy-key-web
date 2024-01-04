import { Injectable } from "@angular/core";
import { Balance } from "../../../domain/model/balance.model";
import { Asset } from "../../../domain/model/asset.model";
import { Account } from "../../../domain/model/account.model";
import { EthereumRepository } from "../../../domain/repository/ethereum.respository";

@Injectable({
  providedIn: 'root'
})
export class EthereunService extends EthereumRepository {
  constructor(
  ) {
    super();
  }

  getBalance(account: string): Promise<Balance[]> {
    return new Promise<Balance[]>((resolve, reject) => {

    });
  }

  getAssetByID(index: number): Promise<Asset> {
    return new Promise<Asset>((resolve, reject) => {

    });
  }

  createAccount(): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
    });
  }

  pay(address: string, asset: string, amount: number): Promise<Balance> {
    return Promise.resolve({ name: "USDT", amount: 1000 });
    //return Promise.reject();
  }
}
