import { Injectable } from "@angular/core";
import { UseCase } from "../base/use-case";
import { Web3Wallet } from "../type/web3-wallet.type";
import { AuthService } from "../../data/service/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoginWeb3UseCase implements UseCase<Web3Wallet, string[]> {
  constructor(
    private authService: AuthService
  ) {
  }

  execute(wallet: Web3Wallet): Promise<string[]> {
    return this.authService.connect(wallet);
  }
}
