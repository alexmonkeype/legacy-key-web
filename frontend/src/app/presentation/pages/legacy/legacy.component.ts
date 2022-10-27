import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {PeraService} from "../../services/pera.service";
import {BalanceModel} from "../../../core/domain/balance.model";
import {GetBalanceUseCase} from "../../../core/usecases/get-balance.usecase";

interface Wallet {
    pos: number,
    alias: string,
    percent: number,
    email1: string,
    email2: string,
}

@Component({
    selector: 'app-legacy',
    templateUrl: './legacy.component.html',
    styleUrls: ['./legacy.component.scss']
})
export class LegacyComponent implements OnInit {
    address = "";
    balances = [] as BalanceModel[];

    displayedColumns: string[] = ['name', 'alias', 'percent', 'email1', 'email2', 'new_wallet', 'existing_wallet'];
    wallets = [
        {
            pos: 1,
            alias: '',
            percent: 0,
            email1: '',
            email2: '',
        },
        {
            pos: 2,
            alias: '',
            percent: 0,
            email1: '',
            email2: '',
        },
        {
            pos: 3,
            alias: '',
            percent: 0,
            email1: '',
            email2: '',
        }
    ];
    dataSource = new MatTableDataSource(this.wallets as Wallet[]);

    @ViewChild(MatTable)
    table = {} as MatTable<Wallet>;

    constructor(
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
}
