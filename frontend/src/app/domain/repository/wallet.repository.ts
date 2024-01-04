export abstract class WalletRepository {
  abstract connect(): Promise<string[]>;
}
