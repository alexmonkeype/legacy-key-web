import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BalanceModel} from "../../../domain/model/balance.model";
import {GetBalanceUseCase} from "../../../domain/usecase/get-balance.usecase";
import { PeraWalletService } from '../../wallets/pera-wallet.service';

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
        private pera: PeraWalletService,
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
