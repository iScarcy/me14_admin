import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICensito } from 'src/app/models/ICensito';

@Component({
  selector: 'app-censito-dialog',
  templateUrl: './censito-dialog.component.html',
  styleUrls: ['./censito-dialog.component.css']
})
export class CensitoDialogComponent {
  censito: ICensito;

  constructor(
    public dialogRef: MatDialogRef<CensitoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICensito
  ) {
    this.censito = { ...data };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.censito);
  }
}
