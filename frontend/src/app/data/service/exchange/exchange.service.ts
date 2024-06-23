import { Injectable } from "@angular/core";
import { ExchangeRepository } from "../../../domain/repository/exchange.repository";
import Web3 from 'web3';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class ExchangeService extends ExchangeRepository {
  getRate(pair: string): Promise<number> {
    return new Promise<number>(async (resolve, reject) => {
      const SCoracle = "0xB28245cEBF086Fe9C4F4b18937D64D2Ef22e848E";

      window.web3 = new Web3(window.ethereum);
      window.contract3 = await new window.web3.eth.Contract(ABI3, SCoracle);

      const res = await window.contract3.methods.getChainlinkDataFeedLatestAnswer().call();
      const price = Number(res) / Math.pow(10, 8);
      resolve(price);
    });
  }
}

const ABI3 = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_data",
        "type": "address"
      }
    ],
    "name": "setData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "getChainlinkDataFeedLatestAnswer",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
