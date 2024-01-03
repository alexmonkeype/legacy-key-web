import { Injectable } from "@angular/core";
import { BalanceModel } from "../../../domain/model/balance.model";
import { AssetModel } from "../../../domain/model/asset.model";
import { AccountModel } from "../../../domain/model/account.model";
import { BinanceRepository } from "../../../domain/repository/binance.respository ";

@Injectable({
  providedIn: 'root'
})
export class BinanceApiService extends BinanceRepository {
  constructor(
  ) {
    super();
  }

  getBalance(account: string): Promise<BalanceModel[]> {
    return new Promise<BalanceModel[]>((resolve, reject) => {

    });
  }

  getAssetByID(index: number): Promise<AssetModel> {
    return new Promise<AssetModel>((resolve, reject) => {

    });
  }

  createAccount(): Promise<AccountModel> {
    return new Promise<AccountModel>((resolve, reject) => {
    });
  }

  pay(address: string, asset: string, amount: number): Promise<BalanceModel> {
    // return Promise.resolve({ name: "USDT", amount: 1000 });
    return Promise.reject();
  }
}
