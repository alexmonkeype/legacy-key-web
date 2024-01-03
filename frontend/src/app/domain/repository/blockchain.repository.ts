import { BalanceModel } from "../model/balance.model";
import { AssetModel } from "../model/asset.model";
import { AccountModel } from "../model/account.model";

export abstract class BlockchainRepository {
  abstract getBalance(account: string): Promise<BalanceModel[]>;
  abstract getAssetByID(index: number): Promise<AssetModel>;
  abstract createAccount(): Promise<AccountModel>;
  abstract pay(address: string, asset: string, amount: number): Promise<BalanceModel>;
}
