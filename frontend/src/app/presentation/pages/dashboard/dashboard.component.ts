import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PeraService} from "../../services/pera.service";
import {BalanceModel} from "../../../core/domain/balance.model";
import {GetBalanceUseCase} from "../../../core/usecases/get-balance.usecase";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    address = "";
    balances = [] as BalanceModel[];

    constructor(
        private router: Router,
        private pera: PeraService,
        private getBalanceUseCase: GetBalanceUseCase,
    ) {
        this.pera.accountAddress.subscribe((address) => {
            if (address != null) {
                this.address = address;
                this.getBalance(address)
            }
        });
    }

    ngOnInit(): void {
    }

    private getBalance(account: string) {
        this.getBalanceUseCase.execute(account)
            .then(data => {
                this.balances = data;
            })
            .catch(err => console.error(err));
    }

    onAcceptProgram() {
        this.router.navigate(['legacy'])
            .catch();
    }
}
