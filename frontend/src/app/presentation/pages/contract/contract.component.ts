import { Component, OnInit } from '@angular/core';
import { LegacyContract, Person } from '../../../domain/model/legacy-contract.model';
import { GetAccountUseCase } from '../../../domain/usecase/get-account.use-case';
import { SaveLegacyUseCase } from '../../../domain/usecase/save-legacy.use-case';
import { Blockchain } from '../../../domain/type/blockchain.type';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  walletChain: Blockchain = "ethereum";
  wallterAddress: string | null = null;
  contract = new LegacyContract();
  amount = 0;
  errorMessage: string | null = null;

  constructor(
    private getAccountUseCase: GetAccountUseCase,
    private saveLegacyUseCase: SaveLegacyUseCase
  ) {

  }

  ngOnInit(): void {
    this.getAccountUseCase.execute()
      .then(acc => {
        this.wallterAddress = acc.address;
      });
  }

  onAddBeneficiary(): void {
    this.contract.beneficiaries[this.contract.beneficiaries.length] = new Person();
  }

  onValidatorsQtyChange(qty: number) {
    console.log(qty);
    const diff = qty - this.contract.validators.length;
    if (diff > 0) {
      console.log(1);
      this.contract.validators.push(
        ...Array.from({ length: diff }, (value, key) => new Person())
      );
    } else {
      console.log(2);
      this.contract.validators.splice(diff);
    }
  }

  async savePress() {
    if (this.wallterAddress == null) {
      return;
    }

    let vali = [];
    let bene = [];

    for (var i = 0; i < this.contract.beneficiaries.length; i++) {
      try {
        bene.push(this.contract.beneficiaries[i].email);
      }
      catch { }
    }
    console.log(this.contract.validators.length);
    for (var i = 0; i < this.contract.validators.length; i++) {
      try {
        vali.push(this.contract.validators[i].email);
      }
      catch { }
    }

    this.saveLegacyUseCase.execute({
      walletChain: this.walletChain,
      beneficiaries: bene,
      validators: vali,
      amount: this.amount,
      walletAddress: this.wallterAddress
    }).then(() => {
      this.onSuccessSave();
    }).catch(e => {
      console.log(e);
      this.errorMessage = e.message;
    });
  }

  onSuccessSave() {
    this.showPopup(
      "Guardado satisfactorio",
      "¡Tu contrato se ha guardo con éxito!",
      "Continuar",
      "success"
    );
  }

  showPopup(title: string, description: string, button: string, icon?: string) {
    const success = confirm(title + "\n" + description);
    if (success) {
      //this.goToNext();
    }
  }
}
