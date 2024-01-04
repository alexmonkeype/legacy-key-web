import { Injectable } from "@angular/core";
import { UseCase } from "../base/use-case";
import { Balance } from "../model/balance.model";
import { AlgorandRepository } from "../repository/algorand.respository";

@Injectable({
  providedIn: 'root'
})
export class GetBalanceUseCase implements UseCase<string, Balance[]> {
  constructor(
    private algoRepository: AlgorandRepository
  ) {

  }

  execute(params: string): Promise<Balance[]> {
    return this.algoRepository.getBalance(params);
  }
}
