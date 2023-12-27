import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PeraService } from "./presentation/services/pera.service";
import { BinanceService } from './presentation/services/binance.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private isConnected = false;

  constructor(
    private router: Router,
    private pera: PeraService,
    private binance: BinanceService,
  ) {
    this.pera.accountAddress.subscribe((address) => {
      if (address != null) {
        this.isConnected = true;
        this.goToDashboard()
      } else if (this.isConnected) {
        this.router.navigate(['connect'])
          .catch();
      }
    });
    this.binance.accountAddress.subscribe((address) => {
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
