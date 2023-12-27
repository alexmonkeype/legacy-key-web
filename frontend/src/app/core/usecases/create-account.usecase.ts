import { Injectable } from "@angular/core";
import { UseCase } from "../base/use-case";
import { AccountModel } from "../domain/account.model";
import { AlgorandRepository } from "../repositories/algorand.respository";

@Injectable({
  providedIn: 'root'
})
export class CreateAccountUseCase implements UseCase<void, AccountModel> {
  constructor(
    private algoRepository: AlgorandRepository
  ) {
  }

  execute(params: void): Promise<AccountModel> {
    return this.algoRepository.createAccount();
  }
}
