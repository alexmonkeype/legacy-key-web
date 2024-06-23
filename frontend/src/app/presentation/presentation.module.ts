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
import { PureStakeService } from '../data/service/pure-stake-repository/pure-stake.service';
import { ContractComponent } from './pages/contract/contract.component';
import { EthereumRepository } from '../domain/repository/ethereum.respository';
import { EthereunService } from '../data/service/ethereum/ethereum.service';
import { VotoComponent } from './pages/voto/voto.component';
import { CobroComponent } from './pages/cobro/cobro.component';
import { LoaderDialog } from './components/dialogs/loader/loader.dialog';
import { ExchangeRepository } from '../domain/repository/exchange.repository';
import { ExchangeService } from '../data/service/exchange/exchange.service';

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
    PaymentComponent,
    ContractComponent,
    VotoComponent,
    CobroComponent,
    LoaderDialog
  ],
  exports: [
    LoginComponent,
    DashboardComponent,
    LegacyComponent,
    PaymentComponent,
    ContractComponent,
    VotoComponent,
    CobroComponent,
    LoaderDialog
  ],
  providers: [
    {
      provide: AlgorandRepository,
      useClass: PureStakeService
    },
    {
      provide: EthereumRepository,
      useClass: EthereunService
    },
    {
      provide: ExchangeRepository,
      useClass: ExchangeService
    }
  ],
})
export class PresentationModule {
}
