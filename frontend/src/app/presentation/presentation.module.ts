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
import { AlgorandRepository } from '../domain/repository/algorand.respository';
import { BinanceRepository } from '../domain/repository/binance.respository ';
import { PureStakeService } from '../data/service/pure-stake-repository/pure-stake.service';
import { BinanceApiService } from '../data/service/binance-api/binance-sdk.service';


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
      useClass: PureStakeService
    },
    {
      provide: BinanceRepository,
      useClass: BinanceApiService
    }
  ],
})
export class PresentationModule {
}
