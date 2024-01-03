import {Injectable} from "@angular/core";
import {UseCase} from "../base/use-case";
import {BalanceModel} from "../model/balance.model";
import { AlgorandRepository } from "../repository/algorand.respository";

@Injectable({
    providedIn: 'root'
})
export class GetBalanceUseCase implements UseCase<string, BalanceModel[]> {
    constructor(
        private algoRepository: AlgorandRepository
    ) {

    }

    execute(params: string): Promise<BalanceModel[]> {
        return this.algoRepository.getBalance(params);
    }
}
