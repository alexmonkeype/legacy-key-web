import { Injectable } from "@angular/core";
import { UseCase } from "../base/use-case";
import { AlgorandRepository } from "../repository/algorand.respository";
import { Blockchain } from "../type/blockchain.type";
import { EthereumRepository } from "../repository/ethereum.respository";

@Injectable({
  providedIn: 'root'
})
export class IsPaidLegacyUseCase implements UseCase<IsPaidLegacyParams, boolean> {
  constructor(
    private algoRepository: AlgorandRepository,
    private ethRepository: EthereumRepository,
  ) {

  }

  async execute(params: IsPaidLegacyParams): Promise<boolean> {
    switch (params.walletChain) {
      case "ethereum":
        return this.ethRepository.isPaidLegacyKeySC(params.walletAddress);
        break;
      case "algorand":
        break;
    }
    return Promise.resolve(false);
  }
}

export type IsPaidLegacyParams = {
  walletChain: Blockchain,
  walletAddress: string
};

