import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Balance } from "../../../domain/model/balance.model";
import { GetBalanceUseCase } from "../../../domain/usecase/get-balance.usecase";
import { CreateAccountUseCase } from "../../../domain/usecase/create-account.usecase";
import { PeraWalletService } from '../../../data/service/pera-wallet/pera-wallet.service';

interface Heir {
  pos: number,
  alias: string,
  percent: number,
  email1: string,
  email2: string,
  new_wallet_address: string,
  new_wallet_mnemonic?: string,
  existing_wallet_address: string,

}

export interface DialogData {
  account: string;
  amount: number;
  percent: number;
  fee: number;
}

const ELEMENT_DATA: Heir[] = [
  {
    pos: 1,
    alias: '',
    percent: 0,
    email1: '',
    email2: '',
    new_wallet_address: '',
    existing_wallet_address: '',
  },
  {
    pos: 2,
    alias: '',
    percent: 0,
    email1: '',
    email2: '',
    new_wallet_address: '',
    existing_wallet_address: '',
  },
  {
    pos: 3,
    alias: '',
    percent: 0,
    email1: '',
    email2: '',
    new_wallet_address: '',
    existing_wallet_address: '',
  }
];

@Component({
  selector: 'app-legacy',
  templateUrl: './legacy.component.html',
  styleUrls: ['./legacy.component.scss']
})
export class LegacyComponent implements OnInit {
  address = "";
  balances = [] as Balance[];

  displayedColumns: string[] = ['name', 'alias', 'percent', 'email1', 'email2', 'new_wallet', 'existing_wallet'];
  dataSource = new MatTableDataSource<Heir>(ELEMENT_DATA);

  @ViewChild(MatTable)
  table = {} as MatTable<Heir>;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    /* private pera: PeraWalletService, */
    private getBalanceUseCase: GetBalanceUseCase,
    private createAccountUseCase: CreateAccountUseCase,
  ) {
    /* this.pera.accountAddress.subscribe((address) => {
        if (address != null) {
            this.address = address;
            this.getBalance(address)
        }
    }); */
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
        if (account.address) {
          heir.new_wallet_address = account.address;
          heir.new_wallet_mnemonic = account.mnemonic;
        }
      })
      .catch(e => console.log(e));
  }

  private isValid() {
    const data = this.dataSource.data.filter(item => {
      return item.new_wallet_address || item.existing_wallet_address
    });

    if (data.length == 0) {
      this.snackBar.open("Al menos una billetera es requerida", "Cerrar", { verticalPosition: "top" });
      return false;
    }

    for (const item of data) {
      if (item.percent <= 0) {
        this.snackBar.open(`Se requiere un porcentaje mayor a para wallet # ${item.pos}`, "Cerrar", { verticalPosition: "top" });
        return false;
      }
      if (item.email1 == '' || item.email2 == '') {
        this.snackBar.open(`Se requiere ambos correos para wallet # ${item.pos}`, "Cerrar", { verticalPosition: "top" });
        return false;
      }
    }

    return true;
  }

  confirmOp() {
    if (!this.isValid()) return;

    const data = this.dataSource.data.filter(item => {
      return item.new_wallet_address || item.existing_wallet_address
    });
    const percent = data.reduce((accumulator, obj) => {
      return accumulator + obj.percent;
    }, 0);

    const account = this.address;
    const amount = this.balances[0].amount * percent / 100.00;
    const fee = 5;

    const dialogRef = this.dialog.open(DialogContentConfirmOpDialog, { data: { amount, fee, account, percent } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.processOp();
      }
    });
  }

  processOp() {

  }
}

@Component({
  selector: 'dialog-content-confirm-op-dialog',
  templateUrl: 'dialog-content-confirm-op.html',
})
export class DialogContentConfirmOpDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }
}
