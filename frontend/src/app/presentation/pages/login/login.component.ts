import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginWeb3UseCase } from '../../../domain/usecase/login-web3.use-case';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private loginWeb3UseCase: LoginWeb3UseCase
  ) {
  }

  ngOnInit(): void {
  }

  onPeraConnect() {
    this.loginWeb3UseCase
      .execute("pera")
      .then((accounts) => {
        this.router.navigate(['payment'])
        .catch();
      })
      .catch((error) => {
        // You MUST handle the reject because once the user closes the modal, peraWallet.connect() promise will be rejected.
        // For the async/await syntax you MUST use try/catch
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          // log the necessary errors
        }
      });
  }

  onMetamaskConnect() {
    this.loginWeb3UseCase
      .execute("metamask")
      .then((accounts) => {
        this.router.navigate(['payment'])
        .catch();
      })
      .catch((error) => {
        // You MUST handle the reject because once the user closes the modal, peraWallet.connect() promise will be rejected.
        // For the async/await syntax you MUST use try/catch
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          // log the necessary errors
        }
      });
  }
}
