import { Component, OnInit } from '@angular/core';
import { LegacyContract, Person } from '../../../domain/model/legacy-contract.model';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  contract = new LegacyContract();

  constructor() { }

  ngOnInit(): void {
    /* this.contract.grantor.firstName = "Alex";
    this.contract.grantor.lastName = "Quevedo";
    this.contract.grantor.email = "alex@monkey.pe";
    this.contract.grantor.phonenumber = "+51935689013";
    this.contract.grantor.documentId = "418984880";
    this.contract.grantor.walletAddress = "0x1";

    this.contract.beneficiaries[0].firstName = "Lucas"
    this.contract.beneficiaries[0].lastName = "Quevedo";
    this.contract.beneficiaries[0].email = "lucas.qt@gmail.com";
    this.contract.beneficiaries[0].phonenumber = "+51999999999";
    this.contract.beneficiaries[0].documentId = "06789797";
    this.contract.beneficiaries[0].walletAddress = "0x2"; */
  }

  onAddBeneficiary(): void {
    this.contract.beneficiaries[this.contract.beneficiaries.length] = new Person();
  }

  onValidatorsQtyChange(qty: number) {
    const diff = qty - this.contract.validators.length;
    if (diff > 0) {
      this.contract.validators.push(
        ...Array.from({ length: diff }, (value, key) => new Person())
      );
    } else {
      this.contract.validators.splice(diff);
    }
  }
}
