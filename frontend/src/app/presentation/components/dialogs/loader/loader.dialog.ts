import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialog as MatDialog, MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@Component({
  selector: 'loader-dialog',
  templateUrl: 'loader.dialog.html',
  styleUrls: ['./loader.dialog.css']
})
export class LoaderDialog {}
