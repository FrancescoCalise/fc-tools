import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-turn-dialog',
  templateUrl: './turn-dialog.component.html',
  styleUrl: './turn-dialog.component.css',
  standalone: true,
  imports: [SharedModule],
})
export class TurnDialogComponent {
  tokenCounts: { name: string, count: number }[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { tokens: { name: string }[] }) {
    this.tokenCounts = this.getTokenCounts(data.tokens);
  }

  getTokenCounts(tokens: { name: string }[]): { name: string, count: number }[] {
    const tokenCounts = tokens.reduce((acc, token) => {
      if (!acc[token.name]) {
        acc[token.name] = 0;
      }
      acc[token.name]++;
      return acc;
    }, {} as { [key: string]: number });

    return Object.keys(tokenCounts).map(key => ({
      name: key,
      count: tokenCounts[key]
    }));
  }
}
