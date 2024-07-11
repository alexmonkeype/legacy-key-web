import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cobroHeir } from '../../../domain/model/legacy-contract.model';
import { GetAccountUseCase } from '../../../domain/usecase/get-account.use-case';
import { CollectLegacyUseCase } from '../../../domain/usecase/collect-legacy.use-case';
import { Blockchain } from '../../../domain/type/blockchain.type';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoaderDialog } from '../../components/dialogs/loader/loader.dialog';

@Component({
  selector: 'app-cobro',
  templateUrl: './cobro.component.html',
  styleUrls: ['./cobro.component.scss']
})
export class CobroComponent implements OnInit {
  walletChain: Blockchain = "ethereum";
  wallterAddress: string | null = null;
  heir = new cobroHeir();
  errorMessage: string | null = null;
  dialogRef?: MatDialogRef<LoaderDialog>;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private getAccountUseCase: GetAccountUseCase,
    private collectLegacyUseCase: CollectLegacyUseCase
  ) {

  }

  ngOnInit(): void {
    this.getAccountUseCase.execute()
      .then(acc => {
        this.wallterAddress = acc.address;
      });
  }

  async cobro() {
    if (this.wallterAddress == null || this.heir.idWithdraw == null) {
      return;
    }

    this.showLoader();

    this.collectLegacyUseCase.execute({
      walletChain: this.walletChain,
      walletAddress: this.wallterAddress,
      idLegacy: this.heir.idWithdraw
    }).then(() => {
      this.onSuccessSave();
    }).catch(e => {
      console.log(e);
      this.errorMessage = e.message;
    }).finally(() => {
      this.dialogRef?.close();
    });
  }

  onSuccessSave() {
    this.showPopup(
      "Guardado satisfactorio",
      "¡Tu herencia se ha cobrado con éxito!",
      "Continuar",
      "success"
    );
  }

  showPopup(title: string, description: string, button: string, icon?: string) {
    const success = confirm(title + "\n" + description);
    if (success) {
      this.goToNext();
    }
  }

  showLoader() {
    this.dialogRef = this.dialog.open(LoaderDialog, {
      disableClose: true
    });
  }

  goToNext() {
    this.router.navigate(['menu'])
      .catch();
  }
}
