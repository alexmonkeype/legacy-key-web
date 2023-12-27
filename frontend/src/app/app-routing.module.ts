import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./presentation/pages/login/login.component";
import { DashboardComponent } from "./presentation/pages/dashboard/dashboard.component";
import { LegacyComponent } from "./presentation/pages/legacy/legacy.component";
import { AuthGuard } from "./presentation/guards/auth.guard";
import { PaymentComponent } from './presentation/pages/payment/payment.component';

const routes: Routes = [
  { path: '', redirectTo: '/connect', pathMatch: 'full' },
  { path: 'connect', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'legacy', component: LegacyComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
