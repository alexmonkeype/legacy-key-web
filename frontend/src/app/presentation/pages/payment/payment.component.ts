import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import Web3 from 'web3';
import { PayServiceUseCase } from '../../../domain/usecase/pay-service.use-case';
import { Blockchain } from '../../../domain/type/blockchain.type';
import { GetAccountUseCase } from '../../../domain/usecase/get-account.use-case';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  walletChain: Blockchain = "ethereum";
  wallterAddress: string | null = null;
  asset = "usdt";
  amount = 100;
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private getAccountUseCase: GetAccountUseCase,
    private payServiceUseCase: PayServiceUseCase
  ) {
  }

  ngOnInit(): void {
    this.getAccountUseCase.execute()
      .then(acc => {
        this.wallterAddress = acc.address;
      });
  }

  async pago() {


  }

  async onPay() {

    if (this.wallterAddress == null) {
      return;
    }

    //await this.pago();

    this.payServiceUseCase.execute({
      walletChain: this.walletChain,
      walletAddress: this.wallterAddress,
      asset: this.asset,
      amount: this.amount
    }).then(() => {
      this.onSuccessPayment();
    }).catch(e => {
      console.log(e);
      this.errorMessage = e.message;
    });
  }

  onSuccessPayment() {
    this.showPopup(
      "Pago exitoso",
      "¡Tu pago se ha generado con éxito! Ahora vamos a confirmar la información de tu herencia.",
      "Continuar",
      "success"
    );
  }

  showPopup(title: string, description: string, button: string, icon?: string) {
    const success = confirm(title + "\n" + description);
    if (success) {
      this.goToNext();
    }
  }

  goToNext() {
    this.router.navigate(['contract'])
      .catch();
  }
}
