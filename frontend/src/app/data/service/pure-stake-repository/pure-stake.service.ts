import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import * as algoSdk from "algosdk";
import { BalanceModel } from "../../../domain/model/balance.model";
import { AccountInfo } from "./type/account-info.type";
import { AssetModel } from "../../../domain/model/asset.model";
import { PureStakeAssetMapper } from "../../mapper/pure-stake-asset.mapper";
import { Asset } from "./type/asset.type";
import { AccountModel } from "../../../domain/model/account.model";
import { AlgorandRepository } from "../../../domain/repository/algorand.respository";
import { environment } from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class PureStakeService extends AlgorandRepository {
  client: algoSdk.Algodv2;

  assetMapper = new PureStakeAssetMapper();

  constructor(
  ) {
    super();

    const token = {
      "x-api-key": environment.ALGORAND_SEVER_API_KEY
    };
    this.client = new algoSdk.Algodv2(token, environment.ALGORAND_SEVER_URL, environment.ALGORAND_SEVER_PORT);
  }

  getBalance(account: string): Promise<BalanceModel[]> {
    return new Promise<BalanceModel[]>((resolve, reject) => {
      this.client.accountInformation(account).do()
        .then(async data => {
          const accountInfo = data as AccountInfo;
          const result = [] as BalanceModel[];

          result.push({ name: "ALGO", amount: accountInfo.amount });

          for (const item of accountInfo.assets) {
            const asset = await this.getAssetByID(item["asset-id"]).then();
            result.push({ name: asset.name, amount: item.amount });
          }

          resolve(result);
        })
        .catch(err => reject(err))
    });
  }

  getAssetByID(index: number): Promise<AssetModel> {
    return new Promise<AssetModel>((resolve, reject) => {
      this.client.getAssetByID(index).do()
        .then(data => resolve(this.assetMapper.mapFrom(data as Asset)))
        .catch(err => reject(err))
    });
  }

  createAccount(): Promise<AccountModel> {
    return new Promise<AccountModel>((resolve, reject) => {
      try {
        const account = algoSdk.generateAccount();
        const mn = algoSdk.secretKeyToMnemonic(account.sk);
        resolve({ address: account.addr, mnemonic: mn });
      } catch (e) {
        reject(e);
      }
    });
  }

  pay(address: string, asset: string, amount: number): Promise<BalanceModel> {
    return Promise.reject();
  }
}
