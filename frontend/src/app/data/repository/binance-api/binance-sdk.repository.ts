import { Injectable } from "@angular/core";
import { BalanceModel } from "../../../core/domain/balance.model";
import { AssetModel } from "../../../core/domain/asset.model";
import { AccountModel } from "../../../core/domain/account.model";
import { BinanceRepository } from "../../../core/repositories/binance.respository ";

@Injectable({
  providedIn: 'root'
})
export class BinanceApiRepository extends BinanceRepository {
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
