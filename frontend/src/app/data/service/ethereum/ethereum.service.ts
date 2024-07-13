import { Injectable, isDevMode } from "@angular/core";
import { environment } from '../../../../environments/environment';
import Web3 from 'web3';
import { Balance } from "../../../domain/model/balance.model";
import { Asset } from "../../../domain/model/asset.model";
import { Account } from "../../../domain/model/account.model";
import { EthereumRepository } from "../../../domain/repository/ethereum.respository";

const ABI1 = require("./abi/sc-legacy.json");
const ABI2 = require("./abi/usdt.json");

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class EthereumService extends EthereumRepository {
  constructor(
  ) {
    super();
  }

  getBalance(account: string): Promise<Balance[]> {
    return new Promise<Balance[]>((resolve, reject) => {

    });
  }

  getAssetByID(index: number): Promise<Asset> {
    return new Promise<Asset>((resolve, reject) => {

    });
  }

  createAccount(): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
    });
  }

  isPaidLegacyKeySC(address: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      resolve(false);
    });
  }

  getDataLegacyKeySC(address: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      resolve({//Ejemplo. Llenar con todos los datos enviados por el usuario
        amount: 0,
        validators: [],
        beneficiaries: []
      });
    });
  }

  payLegacyKeySC(address: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const SCLegacyKey = environment.SEPOLIA_LEGACY_KEY;
      window.web3 = new Web3(window.ethereum);
      const ABI =
        window.contract1 = await new window.web3.eth.Contract(ABI1, SCLegacyKey);
      window.contract2 = await new window.web3.eth.Contract(ABI2, environment.SEPOLIA_USDT);

      try {
        const amount = await window.contract1.methods.amountPay().call();
        await window.contract2.methods.approve(SCLegacyKey, BigInt(amount).toString()).send({ from: address });
        console.log("Approve terminado");
        await window.contract1.methods.payLegacy().send({ from: address });
        console.log("Pago terminado");

        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  newMemberLegacyKeySC(address: string, amount: number, validators: any[], beneficiaries: any[]): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const SCLegacyKey = environment.SEPOLIA_LEGACY_KEY;

        if (isDevMode()) {
          console.log(address, amount);
          console.log(beneficiaries);
          console.log(validators);
        }

        window.web3 = new Web3(window.ethereum);
        window.contract1 = await new window.web3.eth.Contract(ABI1, SCLegacyKey);
        window.contract2 = await new window.web3.eth.Contract(ABI2, environment.SEPOLIA_USDT);
        const amountf = BigInt(amount) * BigInt(10) ** BigInt(await window.contract2.methods.decimals().call());
        await window.contract2.methods.approve(SCLegacyKey, amountf).send({ from: address });
        console.log("Approve terminado");

        await window.contract1.methods.newMember(beneficiaries, validators, amount, 12).send({ from: address });

        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  voteValidador(address: string, idLegacy: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const SCLegacyKey = environment.SEPOLIA_LEGACY_KEY;

        window.web3 = await new Web3(window.ethereum);
        window.contract1 = await new window.web3.eth.Contract(ABI1, SCLegacyKey);
        //const idLegacy = this.id.idVote;
        await window.contract1.methods.voteValidador(idLegacy).send({ from: address });

        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  withdrawHeir(address: string, idLegacy: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const SCLegacyKey = environment.SEPOLIA_LEGACY_KEY;

        window.web3 = await new Web3(window.ethereum);
        window.contract1 = await new window.web3.eth.Contract(ABI1, SCLegacyKey);

        //const idLegacy = this.heir.idWithdraw;
        //console.log(idLegacy);
        await window.contract1.methods.withdrawHeir(idLegacy).send({ from: address });

        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }
}
