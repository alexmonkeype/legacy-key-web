import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    exports: [
        MatButtonModule,
        MatTableModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
    ]
})
export class MaterialModule {
}
