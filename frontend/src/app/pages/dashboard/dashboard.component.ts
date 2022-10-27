import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PeraService} from "../../services/pera.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    address = "";

    constructor(
        private router: Router,
        private pera: PeraService,
    ) {
        this.pera.accountAddress.subscribe((address) => {
            if (address != null) {
                this.address = address;
            }
        });
    }

    ngOnInit(): void {
    }

    onAcceptProgram() {
        this.router.navigate(['legacy'])
            .catch();
    }
}
