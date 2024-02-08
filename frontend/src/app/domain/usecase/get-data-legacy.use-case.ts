import { Injectable } from "@angular/core";
import { UseCase } from "../base/use-case";
import { AlgorandRepository } from "../repository/algorand.respository";
import { Blockchain } from "../type/blockchain.type";
import { EthereumRepository } from "../repository/ethereum.respository";

@Injectable({
  providedIn: 'root'
})
export class GetDataLegacyUseCase implements UseCase<GetDataLegacyParams, any> {
  constructor(
    private algoRepository: AlgorandRepository,
    private ethRepository: EthereumRepository,
  ) {

  }

  async execute(params: GetDataLegacyParams): Promise<any> {
    switch (params.walletChain) {
      case "ethereum":
        return this.ethRepository.getDataLegacyKeySC(params.walletAddress);
        break;
      case "algorand":
        break;
    }
    return Promise.resolve(false);
  }
}

export type GetDataLegacyParams = {
  walletChain: Blockchain,
  walletAddress: string
};

