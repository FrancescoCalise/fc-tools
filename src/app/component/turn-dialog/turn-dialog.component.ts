import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-turn-dialog',
  templateUrl: './turn-dialog.component.html',
  styleUrl: './turn-dialog.component.css',
  standalone: true,
  imports: [SharedModule],
})
export class TurnDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { tokens: { name: string }[] }) {}
}
