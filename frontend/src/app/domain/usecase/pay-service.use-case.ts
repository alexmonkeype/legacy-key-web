import { Injectable } from "@angular/core";
import { UseCase } from "../base/use-case";
import { AlgorandRepository } from "../repository/algorand.respository";
import { BinanceRepository } from "../repository/binance.respository ";
import { Blockchain } from "../type/blockchain.type";
import { BalanceModel } from "../model/balance.model";

@Injectable({
  providedIn: 'root'
})
export class PayServiceUseCase implements UseCase<PayServiceParams, BalanceModel | null> {
  constructor(
    private algoRepository: AlgorandRepository,
    private bnbRepository: BinanceRepository,
  ) {

  }

  async execute(params: PayServiceParams): Promise<BalanceModel | null> {
    //Podemos hacer que para generar el smart contract  de herencia se haga el pago inicial y luego se actualiza con la info de herencia?
    //De esa forma nos aseguramos que para que activar el contrato ya hice la transferencia a nuestra cuenta

    switch (params.walletChain) {
      case "binance":
        return this.bnbRepository.pay(params.walletAddress, params.asset, params.amount);
      case "algorand":
        break;
    }
    return Promise.resolve(null);
  }
}

export type PayServiceParams = {
  walletChain: Blockchain,
  walletAddress: string,
  asset: string,
  amount: number
};

