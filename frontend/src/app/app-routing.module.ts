import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./presentation/pages/login/login.component";
import { DashboardComponent } from "./presentation/pages/dashboard/dashboard.component";
import { LegacyComponent } from "./presentation/pages/legacy/legacy.component";
import { AuthGuard } from "./presentation/guards/auth.guard";
import { PaymentComponent } from './presentation/pages/payment/payment.component';
import { ContractComponent } from './presentation/pages/contract/contract.component';
import { MenuComponent } from './presentation/pages/menu/menu.component';
import { VotoComponent } from './presentation/pages/voto/voto.component';
import { CobroComponent } from './presentation/pages/cobro/cobro.component';

const routes: Routes = [
  { path: '', redirectTo: '/connect', pathMatch: 'full' },
  { path: 'connect', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'legacy', component: LegacyComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'contract', component: ContractComponent, canActivate: [AuthGuard] },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'voto', component: VotoComponent, canActivate: [AuthGuard] },
  { path: 'cobro', component: CobroComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
