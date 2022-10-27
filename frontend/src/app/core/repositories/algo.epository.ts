import {Observable} from 'rxjs';
import {BalanceModel} from "../domain/balance.model";
import {AssetModel} from "../domain/asset.model";

export abstract class AlgoRepository {
    abstract getBalance(account: string): Promise<BalanceModel[]>;
    abstract getAssetByID(index: number): Promise<AssetModel>;
}

