import {UseCase} from "../base/use-case";
import {BalanceModel} from "../domain/balance.model";
import {Injectable} from "@angular/core";
import {AlgoRepository} from "../repositories/algo.epository";

@Injectable({
    providedIn: 'root'
})
export class GetBalanceUseCase implements UseCase<string, BalanceModel[]> {
    constructor(
        private algoRepository: AlgoRepository
    ) {

    }

    execute(params: string): Promise<BalanceModel[]> {
        return this.algoRepository.getBalance(params);
    }
}
