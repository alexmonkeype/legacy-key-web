import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "./material.module";
import { LoginComponent } from "./pages/login/login.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { LegacyComponent, DialogContentConfirmOpDialog } from "./pages/legacy/legacy.component";
import { PaymentComponent } from './pages/payment/payment.component';
import { PureStakeRepository } from '../data/repository/pure-stake-repository/pure-stake.repository';
import { AlgorandRepository } from '../core/repositories/algorand.respository';
import { BinanceApiRepository } from '../data/repository/binance-api/binance-sdk.repository';
import { BinanceRepository } from '../core/repositories/binance.respository ';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginComponent,
    DashboardComponent,
    LegacyComponent,
    DialogContentConfirmOpDialog,
    PaymentComponent
  ],
  exports: [
    LoginComponent,
    DashboardComponent,
    LegacyComponent,
    PaymentComponent
  ],
  providers: [
    {
      provide: AlgorandRepository,
      useClass: PureStakeRepository
    },
    {
      provide: BinanceRepository,
      useClass: BinanceApiRepository
    }
  ],
})
export class PresentationModule {
}
