import {Injectable} from "@angular/core";
import {Observable} from 'rxjs';
import {AlgoRepository} from "../../../core/repositories/algo.epository";
import * as algoSdk from "algosdk";
import {BalanceModel} from "../../../core/domain/balance.model";
import {AccountInfoEntity} from "./account-info.entity";
import {AssetModel} from "../../../core/domain/asset.model";
import {PureStakeAssetMapper} from "./pure-stake-asset.mapper";
import {AssetEntity} from "./asset.entity";
import {AccountModel} from "../../../core/domain/account.model";

const server = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";
const token = {
    "x-api-key": "BVGhHCWd7w8YvU5l2eCfc8DCHcYAM7Wgi3ktMzHb"
};

@Injectable({
    providedIn: 'root'
})
export class PureStakeRepository extends AlgoRepository {
    client: algoSdk.Algodv2;

    assetMapper = new PureStakeAssetMapper();

    constructor(
    ) {
        super();

        this.client = new algoSdk.Algodv2(token, server, port);
    }

    getBalance(account: string): Promise<BalanceModel[]> {
        return new Promise<BalanceModel[]>((resolve, reject) => {
            this.client.accountInformation(account).do()
                .then(async data => {
                    const accountInfo = data as AccountInfoEntity;
                    const result = [] as BalanceModel[];

                    result.push({name: "ALGO", amount: accountInfo.amount});

                    for (const item of accountInfo.assets) {
                        const asset = await this.getAssetByID(item["asset-id"]).then();
                        result.push({name: asset.name, amount: item.amount});
                    }

                    resolve(result);
                })
                .catch(err => reject(err))
        });
    }

    getAssetByID(index: number): Promise<AssetModel> {
        return new Promise<AssetModel>((resolve, reject) => {
            this.client.getAssetByID(index).do()
                .then(data => resolve(this.assetMapper.mapFrom(data as AssetEntity)))
                .catch(err => reject(err))
        });
    }

    createAccount(): Promise<AccountModel> {
        return new Promise<AccountModel>((resolve, reject) => {
            try {
                const account = algoSdk.generateAccount();
                const mn = algoSdk.secretKeyToMnemonic(account.sk);
                resolve({address: account.addr, mnemonic: mn});
            } catch (e) {
                reject(e);
            }
        });
    }
}
