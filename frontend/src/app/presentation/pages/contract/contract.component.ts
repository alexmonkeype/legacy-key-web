import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { LegacyContract, Person } from '../../../domain/model/legacy-contract.model';
import { GetAccountUseCase } from '../../../domain/usecase/get-account.use-case';
import { SaveLegacyUseCase } from '../../../domain/usecase/save-legacy.use-case';
import { Blockchain } from '../../../domain/type/blockchain.type';
import { GetDataLegacyUseCase } from '../../../domain/usecase/get-data-legacy.use-case';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { LoaderDialog } from '../../components/dialogs/loader/loader.dialog';

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

  @ViewChild('stepper') stepper!: MatStepper;
  dialogRef?: MatDialogRef<LoaderDialog>;

  grantorFormGroup = this._formBuilder.group({
    grantor_first_name: ['', Validators.required],
    grantor_last_name: ['', Validators.required],
    grantor_document_id: ['', Validators.required],
    grantor_email: ['', [Validators.required, Validators.email]],
    grantor_phonenumber: ['', Validators.required],
    beneficiarys_amount: ['', Validators.required],
  });
  beneficiariesFormGroup = this._formBuilder.group({
    beneficiaries: this._formBuilder.array([])
  });
  validatorsFormGroup = this._formBuilder.group({
    validators_qty: ['', Validators.required],
    validator_inactivity_time: ['', Validators.required],
    validators: this._formBuilder.array([])
  });

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private getAccountUseCase: GetAccountUseCase,
    private saveLegacyUseCase: SaveLegacyUseCase,
    private getDataLegacyUseCase: GetDataLegacyUseCase
  ) {
  }

  ngOnInit(): void {
    this.getAccountUseCase.execute()
      .then(acc => {
        if (acc.address) {
          this.wallterAddress = acc.address;
          this.getContractData(acc.address);
          this.onAddBeneficiary();
        }
      });
  }

  getContractData(account: string): void {
    this.getDataLegacyUseCase.execute({
      walletChain: this.walletChain,
      walletAddress: account
    }).then(data => {
      console.log("data", data);
    }).catch(e => console.error(e));
  }

  get beneficiaryArr(): FormArray {
    return this.beneficiariesFormGroup.get('beneficiaries') as FormArray;
  }

  onAddBeneficiary(): void {
    let fg = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phonenumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      amount: ['', Validators.required],
      token: ['', Validators.required],
      walletAddress: ['', Validators.required],
      sendInfo: false,
    });
    this.beneficiaryArr.push(fg);
  }

  get validatorArr(): FormArray {
    return this.validatorsFormGroup.get('validators') as FormArray;
  }

  addValidator(): void {
    let fg = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      walletAddress: ['', Validators.required]
    });
    this.validatorArr.push(fg);
  }

  onValidatorsQtyChange(qty: string) {
    //const diff = qty - this.contract.validators.length;
    const diff = parseInt(qty) - this.validatorArr.length;
    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        this.addValidator();
      }
    } else {
      for (let i = 0; i < diff * -1; i++) {
        this.validatorArr.removeAt(this.validatorArr.length - 1);
      }
    }
  }

  async savePress() {
    if (this.wallterAddress == null) {
      return;
    }

    if(!this.grantorFormGroup.valid) {
      this.stepper.selectedIndex = 0;
      return;
    }
    if(!this.beneficiariesFormGroup.valid) {
      this.stepper.selectedIndex = 1;
      return;
    }
    if(!this.validatorsFormGroup.valid) {
      this.stepper.selectedIndex = 2;
      return;
    }

    this.showLoader();

    /* let vali = [];
    let bene = [];

    for (var i = 0; i < this.contract.beneficiaries.length; i++) {
      try {
        bene.push(this.contract.beneficiaries[i].walletAddress);
      }
      catch { }
    }
    console.log(this.contract.validators.length);
    for (var i = 0; i < this.contract.validators.length; i++) {
      try {
        vali.push(this.contract.validators[i].walletAddress);
      }
      catch { }
    } */

    this.saveLegacyUseCase.execute({
      walletChain: this.walletChain,
      beneficiaries: this.beneficiariesFormGroup.value.beneficiaries || [],
      validators: this.validatorsFormGroup.value.validators || [],
      amount: this.grantorFormGroup.value.beneficiarys_amount ? parseFloat(this.grantorFormGroup.value.beneficiarys_amount) : 0,
      walletAddress: this.wallterAddress
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
      "¡Tu contrato se ha guardo con éxito!",
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
