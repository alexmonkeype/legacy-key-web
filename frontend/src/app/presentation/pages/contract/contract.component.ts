import { Component, OnInit } from '@angular/core';
import { LegacyContract, Person } from '../../../domain/model/legacy-contract.model';
import { GetAccountUseCase } from '../../../domain/usecase/get-account.use-case';
import Web3 from 'web3';

declare let window: any;

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  wallterAddress: string | null = null;
  contract = new LegacyContract();
  monto='';

  constructor(private getAccountUseCase: GetAccountUseCase) {
    
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
        ...Array.from({ length: diff }, (value,key) => new Person())
      );
    } else {
      console.log(2);
      this.contract.validators.splice(diff);
    }
  }

  async guarda(){
    let vali=[];
    let bene=[];
    console.log("paso por aca");    
    const amount = this.monto;            
    const SCLegacyKey="0xeAE50F2085D16DcE748C065cd7333732576554A7";
    const ABI1 = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_adLegacy",
                "type": "address"
            },
            {
                "internalType": "contract IERC20Metadata",
                "name": "_usdt",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "adLegacy",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "amountPay",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "deathWitness",
        "outputs": [
            {
                "internalType": "bool",
                "name": "permit",
                "type": "bool"
            },
            {
                "internalType": "address",
                "name": "padre",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decUSDT",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "heirCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "heirDetail",
        "outputs": [
            {
                "internalType": "bool",
                "name": "permit",
                "type": "bool"
            },
            {
                "internalType": "address",
                "name": "padre",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "id",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "memberID",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "_hijos",
                "type": "address[]"
            },
            {
                "internalType": "address[]",
                "name": "_validador",
                "type": "address[]"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_time",
                "type": "uint256"
            }
        ],
        "name": "newMember",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "padre",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "sign",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "validTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "saldo",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "payLegacy",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "setAmountPay",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_count",
                "type": "uint256"
            }
        ],
        "name": "voteValidador",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_count",
                "type": "uint256"
            }
        ],
        "name": "withdrawHeir",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "witnessCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
    ]
    console.log("legacy");    
    window.web3 = await new Web3(window.ethereum);
    window.contract1 = await new window.web3.eth.Contract( ABI1, SCLegacyKey);

    for (var i = 0; i < this.contract.beneficiaries.length; i++) {
      
      try{
        bene.push(this.contract.beneficiaries[i].email);
      }
      catch{}
    }
    console.log(this.contract.validators.length);
    for (var i = 0; i < this.contract.validators.length; i++) {
      
      try{
        vali.push(this.contract.validators[i].email);
      }
      catch{}
    }
    
    console.log(amount);
    console.log(bene);
    console.log(vali);
    console.log(this.wallterAddress);
    await window.contract1.methods.newMember(bene,vali,amount,12).send({ from: this.wallterAddress });
  }

  
}
