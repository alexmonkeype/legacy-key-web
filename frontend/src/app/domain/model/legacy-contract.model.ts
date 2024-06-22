export class Person {
  firstName?: string;
  lastName?: string;
  email?: string;
  phonenumber?: string;
  documentId?: string;
  walletAddress?: string;
  sendInfo: boolean = false;
}

export class LegacyContract {
  grantor: Person = new Person;
  //beneficiaryQty = 1;
  beneficiaries: Person[] = [new Person];
  //validatorQty = 0;
  validators: Person[] = [];
}

export class voteValidator {
  grantor: Person = new Person;
  idVote: string = "";
}

export class cobroHeir {
  grantor: Person = new Person;
  idWithdraw?: string;
}
