import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';


@Component({
  selector: 'app-init-bag-dialog',
  templateUrl: './init-bag-dialog.component.html',
  styleUrls: ['./init-bag-dialog.component.css'],
  standalone: true,
  imports: [SharedModule]
})
export class InitBagDialogComponent {
  predefinedTokens: string[] = ['EVENTO', 'DESTINI', 'TERRORE', 'PORTALE', 'RESA DEI CONTI', 'VUOTO', 'MOSTRO', 'QUOTIDIANO'];
  selectedTokens: { name: string, count: number }[] = [];

  constructor(public dialogRef: MatDialogRef<InitBagDialogComponent>) {
    // Pre-populate with default token options
    this.predefinedTokens.forEach(token => {
      this.selectedTokens.push({ name: token, count: 0 });
    });
  }

  onConfirm(): void {
    this.dialogRef.close(this.selectedTokens);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}