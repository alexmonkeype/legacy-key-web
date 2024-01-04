import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PeraWalletService } from "./presentation/wallets/pera-wallet.service";
import { MetamaskWalletService } from './presentation/wallets/metamask-wallet.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private isConnected = false;

  constructor(
    private router: Router,
    private peraWalltet: PeraWalletService,
    private metamaskWallet: MetamaskWalletService
  ) {
    this.peraWalltet.accountAddress.subscribe((address) => {
      if (address != null) {
        this.isConnected = true;
        this.goToDashboard()
      } else if (this.isConnected) {
        this.router.navigate(['connect'])
          .catch();
      }
    });
    this.metamaskWallet.accountAddress.subscribe((address) => {
      if (address != null) {
        this.isConnected = true;
        this.goToDashboard()
      } else if (this.isConnected) {
        this.router.navigate(['connect'])
          .catch();
      }
    });
  }

  ngOnInit(): void {
  }

  goToDashboard() {
    this.router.navigate(['payment'])
      .catch();
  }
}
