import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PeraService} from "./services/pera.service";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    constructor(
        private router: Router,
        private pera: PeraService,
    ) {
        this.pera.accountAddress.subscribe((address) => {
            if (address != null) {
                this.goToDashboard()
            }
        });
    }

    ngOnInit(): void {
    }

    goToDashboard() {
        this.router.navigate(['dashboard'])
            .catch();
    }
}
