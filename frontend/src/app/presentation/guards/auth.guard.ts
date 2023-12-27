import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {PeraService} from "../services/pera.service";
import { BinanceService } from '../services/binance.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private pera: PeraService,
        private binace: BinanceService
    ) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        if (this.pera.getAccountAddress() == null && this.binace.getAccountAddress() == null) {
            return this.router.parseUrl('/connect');
        }
        return true;
    }

}
