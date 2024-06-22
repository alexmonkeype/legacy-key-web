import { Balance } from "../model/balance.model";
import { Asset } from "../model/asset.model";
import { Account } from "../model/account.model";

export abstract class BlockchainRepository {
  abstract getBalance(account: string): Promise<Balance[]>;
  abstract getAssetByID(index: number): Promise<Asset>;
  abstract createAccount(): Promise<Account>;
  abstract isPaidLegacyKeySC(address: string): Promise<boolean>;
  abstract getDataLegacyKeySC(address: string): Promise<any>;
  abstract payLegacyKeySC(address: string): Promise<void>;
  abstract newMemberLegacyKeySC(address: string, amount: number, validators: any[], beneficiaries: any[]): Promise<void>;
  abstract voteValidador(address: string, idLegacy: string): Promise<void>;
  abstract withdrawHeir(address: string, idLegacy: string): Promise<void>;
}
