import {UseCase} from "../base/use-case";
import {AccountModel} from "../domain/account.model";
import {AlgoRepository} from "../repositories/algo.epository";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CreateAccountUseCase implements UseCase<void, AccountModel> {
    constructor(
        private algoRepository: AlgoRepository
    ) {
    }

    execute(params: void): Promise<AccountModel> {
        return this.algoRepository.createAccount();
    }
}
