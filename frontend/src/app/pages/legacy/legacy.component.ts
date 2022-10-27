import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";

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

    constructor() {
    }

    ngOnInit(): void {
    }
}
