import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone: false,
  selector: 'app-session-expired-dialog',
  templateUrl: './session-expired-dialog.component.html',
  styleUrls: ['./session-expired-dialog.component.css']
})
export class SessionExpiredDialogComponent {
  constructor(private dialogRef: MatDialogRef<SessionExpiredDialogComponent>) {}

  continueToLogin(): void {
    this.dialogRef.close();
  }
}
