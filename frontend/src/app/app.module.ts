import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "./material.module";
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LegacyComponent} from './pages/legacy/legacy.component';
import {PureStakeRepository} from "./data/repository/pure-stake-repository/pure-stake.repository";
import {AlgoRepository} from "./core/repositories/algo.epository";


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        LegacyComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
    ],
    providers: [
        {
            provide: AlgoRepository,
            useClass: PureStakeRepository
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
