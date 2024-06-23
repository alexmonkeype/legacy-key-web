import { Injectable } from "@angular/core";
import { ExchangeRepository } from "../../../domain/repository/exchange.repository";

@Injectable({
  providedIn: 'root'
})
export class ExchangeService extends ExchangeRepository {
  getRate(pair: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      resolve(3505.24);
    });
  }
}
