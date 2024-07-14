import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginWeb3UseCase } from '../../../domain/usecase/login-web3.use-case';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(
    private router: Router,
    private loginWeb3UseCase: LoginWeb3UseCase
  ) {
  }

  ngOnInit(): void {
  }

  pagar() {
    this.router.navigate(['payment'])
  }

  votar() {
    this.router.navigate(['voto'])
  }

  cobrar() {
    this.router.navigate(['cobro'])
  }

}
