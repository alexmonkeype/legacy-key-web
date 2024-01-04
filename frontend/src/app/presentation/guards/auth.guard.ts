import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import { PeraWalletService } from '../wallets/pera-wallet.service';
import { MetamaskWalletService } from '../wallets/metamask-wallet.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private peraWallet: PeraWalletService,
        private metamaskWallet: MetamaskWalletService
    ) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        if (this.peraWallet.getAccountAddress() == null && this.metamaskWallet.getAccountAddress() == null) {
            return this.router.parseUrl('/connect');
        }
        return true;
    }

}
