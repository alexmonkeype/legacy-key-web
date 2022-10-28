import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {PeraService} from "../../services/pera.service";
import {BalanceModel} from "../../../core/domain/balance.model";
import {GetBalanceUseCase} from "../../../core/usecases/get-balance.usecase";
import {CreateAccountUseCase} from "../../../core/usecases/create-account.usecase";

interface Heir {
    pos: number,
    alias: string,
    percent: number,
    email1: string,
    email2: string,
    new_wallet_address: string,
    new_wallet_mnemonic?: string,

}

const ELEMENT_DATA: Heir[] = [
    {
        pos: 1,
        alias: '',
        percent: 0,
        email1: '',
        email2: '',
        new_wallet_address: '',
    },
    {
        pos: 2,
        alias: '',
        percent: 0,
        email1: '',
        email2: '',
        new_wallet_address: '',
    },
    {
        pos: 3,
        alias: '',
        percent: 0,
        email1: '',
        email2: '',
        new_wallet_address: '',
    }
];

@Component({
    selector: 'app-legacy',
    templateUrl: './legacy.component.html',
    styleUrls: ['./legacy.component.scss']
})
export class LegacyComponent implements OnInit {
    address = "";
    balances = [] as BalanceModel[];

    displayedColumns: string[] = ['name', 'alias', 'percent', 'email1', 'email2', 'new_wallet', 'existing_wallet'];
    dataSource = new MatTableDataSource<Heir>(ELEMENT_DATA);

    //@ViewChild(MatTable)
    //table = {} as MatTable<Heir>;

    constructor(
        private pera: PeraService,
        private getBalanceUseCase: GetBalanceUseCase,
        private createAccountUseCase: CreateAccountUseCase,
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

    private createWallet(pos: number) {
        const heir = this.dataSource.data.find(item => {
            return item.pos == pos
        });
        if (heir == null) return;
        
        this.createAccountUseCase.execute()
            .then(account => {
                heir.new_wallet_address = account.address;
                heir.new_wallet_mnemonic = account.mnemonic;
            })
            .catch(e => console.log(e));
    }
}
