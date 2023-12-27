import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  address = "";

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onPay() {
    this.onSuccessPayment()
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
