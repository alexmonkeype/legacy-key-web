import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LegacyComponent} from "./pages/legacy/legacy.component";

const routes: Routes = [
    {path: '', redirectTo: '/connect', pathMatch: 'full'},
    {path: 'connect', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'legacy', component: LegacyComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
