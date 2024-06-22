import { Component, OnInit } from '@angular/core';
import { voteValidator } from '../../../domain/model/legacy-contract.model';
import { GetAccountUseCase } from '../../../domain/usecase/get-account.use-case';
import { Blockchain } from '../../../domain/type/blockchain.type';
import { VoteLegacyUseCase } from '../../../domain/usecase/vote-legacy.use-case';

@Component({
  selector: 'app-voto',
  templateUrl: './voto.component.html',
  styleUrls: ['./voto.component.scss']
})
export class VotoComponent implements OnInit {
  walletChain: Blockchain = "ethereum";
  wallterAddress: string | null = null;
  validator = new voteValidator();
  errorMessage: string | null = null;

  constructor(
    private getAccountUseCase: GetAccountUseCase,
    private voteLegacyUseCase: VoteLegacyUseCase,
  ) {
  }

  ngOnInit(): void {
    this.getAccountUseCase.execute()
      .then(acc => {
        this.wallterAddress = acc.address;
      });
  }

  async voto() {
    if (this.wallterAddress == null || this.validator.idVote == null) {
      return;
    }

    this.voteLegacyUseCase.execute({
      walletChain: this.walletChain,
      walletAddress: this.wallterAddress,
      idLegacy: this.validator.idVote,
      //SCLegacyKeyAddress: this.id.SCLegacyKeyAddress
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
      "¡Tu voto se ha guardo con éxito!",
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
