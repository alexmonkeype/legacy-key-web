import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
//import * as algoSdk from "algosdk";
import { Balance } from "../../../domain/model/balance.model";
import { AccountInfoType } from "./type/account-info.type";
import { Asset } from "../../../domain/model/asset.model";
import { PureStakeAssetMapper } from "../../mapper/pure-stake-asset.mapper";
import { AssetType } from "./type/asset.type";
import { Account } from "../../../domain/model/account.model";
import { AlgorandRepository } from "../../../domain/repository/algorand.respository";
import { environment } from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class PureStakeService extends AlgorandRepository {
  //client: algoSdk.Algodv2;

  assetMapper = new PureStakeAssetMapper();

  constructor(
  ) {
    super();

    const token = {
      "x-api-key": environment.ALGORAND_SEVER_API_KEY
    };
    /* this.client = new algoSdk.Algodv2(token, environment.ALGORAND_SEVER_URL, environment.ALGORAND_SEVER_PORT); */
  }

  getBalance(account: string): Promise<Balance[]> {
    return new Promise<Balance[]>((resolve, reject) => {
      /* this.client.accountInformation(account).do()
        .then(async data => {
          const accountInfo = data as AccountInfoType;
          const result = [] as Balance[];

          result.push({ name: "ALGO", amount: accountInfo.amount });

          for (const item of accountInfo.assets) {
            const asset = await this.getAssetByID(item["asset-id"]).then();
            result.push({ name: asset.name, amount: item.amount });
          }

          resolve(result);
        })
        .catch(err => reject(err)); */
    });
  }

  getAssetByID(index: number): Promise<Asset> {
    return new Promise<Asset>((resolve, reject) => {
      /* this.client.getAssetByID(index).do()
        .then(data => resolve(this.assetMapper.mapFrom(data as AssetType)))
        .catch(err => reject(err)); */
    });
  }

  createAccount(): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
      try {
        /* const account = algoSdk.generateAccount();
        const mn = algoSdk.secretKeyToMnemonic(account.sk);
        resolve({ address: account.addr, mnemonic: mn }); */
      } catch (e) {
        reject(e);
      }
    });
  }

  isPaidLegacyKeySC(address: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      resolve(false);
    });
  }

  getDataLegacyKeySC(address: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      resolve({//Ejemplo. Llenar con todos los datos enviados por el usuario
        amount: 0,
        validators: [],
        beneficiaries: []
      });
    });
  }

  payLegacyKeySC(address: string): Promise<void> {
    return Promise.reject();
  }

  newMemberLegacyKeySC(address: string, amount: number, validators: any[], beneficiaries: any[]): Promise<void> {
    return Promise.reject();
  }
  voteValidador(address: string, idLegacy: string): Promise<void> {
    return Promise.reject();
  }

  withdrawHeir(address: string, idLegacy: string): Promise<void> {
    return Promise.reject();
  }
}
