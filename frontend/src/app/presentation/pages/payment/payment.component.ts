import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayServiceUseCase } from '../../../domain/usecase/pay-service.use-case';
import { Blockchain } from '../../../domain/type/blockchain.type';
import { PeraWalletService } from '../../wallets/pera-wallet.service';
import { MetamaskWalletService } from '../../wallets/metamask-wallet.service';

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

  constructor(
    private router: Router,
    private peraWallet: PeraWalletService,
    private metamaskWallet: MetamaskWalletService,
    private payServiceUseCase: PayServiceUseCase
  ) {
    if (this.peraWallet.getAccountAddress()) {
      this.wallterAddress = peraWallet.getAccountAddress();
    }
    if (this.metamaskWallet.getAccountAddress()) {
      this.wallterAddress = metamaskWallet.getAccountAddress();
    }
  }

  ngOnInit(): void {
  }

  onPay() {
    if (this.wallterAddress == null) {
      return;
    }

    this.payServiceUseCase.execute({
      walletChain: this.walletChain,
      walletAddress: this.wallterAddress,
      asset: this.asset,
      amount: this.amount
    }).then(balance => {
      if (balance) {
        this.onSuccessPayment();
      }
    }).catch(e => console.error(e));
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
