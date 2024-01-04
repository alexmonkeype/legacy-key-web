import { Injectable } from "@angular/core";
import { UseCase } from "../base/use-case";
import { Account } from "../model/account.model";
import { AlgorandRepository } from "../repository/algorand.respository";

@Injectable({
  providedIn: 'root'
})
export class CreateAccountUseCase implements UseCase<void, Account> {
  constructor(
    private algoRepository: AlgorandRepository
  ) {
  }

  execute(params: void): Promise<Account> {
    return this.algoRepository.createAccount();
  }
}
