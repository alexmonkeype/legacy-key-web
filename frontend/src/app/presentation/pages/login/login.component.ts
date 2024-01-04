import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PeraWalletService } from "../../wallets/pera-wallet.service";
import { MetamaskWalletService } from '../../wallets/metamask-wallet.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private peraWallet: PeraWalletService,
    private metamaskWallet: MetamaskWalletService
  ) {
  }

  ngOnInit(): void {
    /*this.peraWallet.reconnectSession()
        .then((accounts) => {
            console.log("reconectando");
            // Setup the disconnect event listener
            this.peraWallet.connector?.on("disconnect", this.handleDisconnectWalletClick);

            if (accounts.length) {
                this.setAccountAddress(accounts[0]);
            }
        });*/
  }

  /*handleDisconnectWalletClick() {
      this.pera.wallet.disconnect();
      this.setAccountAddress(null);
  }*/

  /*setAccountAddress(address: any) {
      console.log("address", address);
  }*/

  onPeraConnect() {
    this.peraWallet
      .connect()
      .then((newAccounts) => {
        // Setup the disconnect event listener
        //this.pera.wallet.connector?.on("disconnect", this.handleDisconnectWalletClick);

        //this.setAccountAddress(newAccounts[0]);
      })
      .catch((error) => {
        // You MUST handle the reject because once the user closes the modal, peraWallet.connect() promise will be rejected.
        // For the async/await syntax you MUST use try/catch
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          // log the necessary errors
        }
      });
    /*this.router.navigate(['dashboard'])
        .catch();*/
  }

  onMetamaskConnect() {
    this.metamaskWallet
      .connect()
      .then(() => {
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
