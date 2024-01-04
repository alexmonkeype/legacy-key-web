import { Injectable } from "@angular/core";
import { UseCase } from "../base/use-case";
import { Account } from "../model/account.model";
import { AuthService } from "../../data/service/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class GetAccountUseCase implements UseCase<string, Account> {
  constructor(
    private authService: AuthService
  ) {

  }

  execute(): Promise<Account> {
    return this.authService.getAccount();
  }
}
