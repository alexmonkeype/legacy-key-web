import { Balance } from "../model/balance.model";
import { Asset } from "../model/asset.model";
import { Account } from "../model/account.model";

export abstract class BlockchainRepository {
  abstract getBalance(account: string): Promise<Balance[]>;
  abstract getAssetByID(index: number): Promise<Asset>;
  abstract createAccount(): Promise<Account>;
  abstract pay(address: string, asset: string, amount: number): Promise<Balance>;
}
