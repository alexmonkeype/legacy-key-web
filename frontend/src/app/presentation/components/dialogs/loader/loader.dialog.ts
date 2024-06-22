import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'loader-dialog',
  templateUrl: 'loader.dialog.html',
  styleUrls: ['./loader.dialog.css']
})
export class LoaderDialog {}
