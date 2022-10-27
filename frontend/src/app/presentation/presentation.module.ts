import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./pages/login/login.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LegacyComponent} from "./pages/legacy/legacy.component";
import {MaterialModule} from "../material.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AlgoRepository} from "../core/repositories/algo.epository";
import {PureStakeRepository} from "../data/repository/pure-stake-repository/pure-stake.repository";


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        HttpClientModule,
        BrowserAnimationsModule,
    ],
    declarations: [
        LoginComponent,
        DashboardComponent,
        LegacyComponent
    ],
    exports: [
        LoginComponent,
        DashboardComponent,
        LegacyComponent
    ],
    providers: [
        {
            provide: AlgoRepository,
            useClass: PureStakeRepository
        }
    ],
})
export class PresentationModule {
}
