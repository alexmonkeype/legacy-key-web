import { Injectable } from "@angular/core";
import { UseCase } from "../base/use-case";
import { AlgorandRepository } from "../repository/algorand.respository";
import { Blockchain } from "../type/blockchain.type";
import { EthereumRepository } from "../repository/ethereum.respository";

@Injectable({
  providedIn: 'root'
})
export class SaveLegacyUseCase implements UseCase<SaveLegacyParams, void | null> {
  constructor(
    private algoRepository: AlgorandRepository,
    private ethRepository: EthereumRepository,
  ) {

  }

  async execute(params: SaveLegacyParams): Promise<void | null> {
    switch (params.walletChain) {
      case "ethereum":
        return this.ethRepository.newMemberLegacyKeySC(params.walletAddress, params.amount, params.validators, params.beneficiaries);
        break;
      case "algorand":
        break;
    }
    return Promise.resolve(null);
  }
}

export type SaveLegacyParams = {
  walletChain: Blockchain,
  walletAddress: string,
  amount: number,
  validators: any[],
  beneficiaries: any[]
};

