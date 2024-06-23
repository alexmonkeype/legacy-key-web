import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GetExchangeRateyUseCase } from './domain/usecase/get-exchange-rate.use-case';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  exchangeRate?: string;

  constructor(
    private router: Router,
    private getExchangeRateyUseCase: GetExchangeRateyUseCase,
  ) {
  }

  ngOnInit(): void {
    this.getExchangeRateyUseCase.execute("eth/usd")
      .then(rate => {
        const options = {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        };
        const price =  Number(rate.toFixed(2)).toLocaleString('en', options);
        this.exchangeRate = `ETH: ${price} USD`;
      });
  }
}
