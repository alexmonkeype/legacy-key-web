export abstract class ExchangeRepository {
  abstract getRate(pair: string): Promise<number>;
}
