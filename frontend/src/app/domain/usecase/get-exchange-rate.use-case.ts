import { Injectable } from "@angular/core";
import { UseCase } from "../base/use-case";
import { ExchangeRepository } from "../repository/exchange.repository";

@Injectable({
  providedIn: 'root'
})
export class GetExchangeRateyUseCase implements UseCase<string, number> {
  constructor(
    private exchangeRepository: ExchangeRepository,
  ) {

  }

  async execute(pair: string): Promise<number> {
    return this.exchangeRepository.getRate(pair);
  }
}

