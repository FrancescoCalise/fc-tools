import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { TurnDialogComponent } from '../turn-dialog/turn-dialog.component';

interface Token {
  name: string;
}

@Component({
  selector: 'aarkham-horror-tools',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './arkham-horror-tools.component.html',
  styleUrl: './arkham-horror-tools.component.css'
})

export class ArkhamHorrorToolsComponent {

  predefinedTokens: string[] = ['EVENTO', 'DESTINI', 'TERRORE', 'PORTALE', 'RESA DEI CONTI', 'VUOTO', 'MOSTRO', 'QUOTIDIANO'];
  availableTokens: string[] = [...this.predefinedTokens];
  selectedToken: string = this.availableTokens[0];
  tokenCount: number = 1;  // Inizializza il contatore a 1
  countOptions: number[] = [1, 2, 3, 4, 5];  // Opzioni per il contatore
  tokens: { name: string }[] = [];
  extractedTokens: { name: string }[] = [];
  turnExtractedTokens: { name: string }[] = [];

  constructor(public dialog: MatDialog) {}

  addToken(): void {
    for (let i = 0; i < this.tokenCount; i++) {
      this.tokens.push({ name: this.selectedToken });
    }
    this.availableTokens = this.availableTokens.filter(token => token !== this.selectedToken);
    this.selectedToken = this.availableTokens.length > 0 ? this.availableTokens[0] : '';
    this.tokenCount = 1;
    this.shuffleBag();
  }

  drawTokens(count: number): void {
    while (count > 0) {
      if (this.tokens.length === 0) {
        this.tokens = [...this.extractedTokens];
        this.extractedTokens = [];
        this.shuffleBag();
      }
      const index = Math.floor(Math.random() * this.tokens.length);
      const drawnToken = this.tokens.splice(index, 1)[0];
      this.extractedTokens.push(drawnToken);
      this.turnExtractedTokens.push(drawnToken);
      count--;
    }
  }

  resetBag(): void {
    this.tokens = [...this.tokens, ...this.extractedTokens];
    this.extractedTokens = [];
    this.turnExtractedTokens = [];
    this.availableTokens = [...this.predefinedTokens];
    this.selectedToken = this.availableTokens.length > 0 ? this.availableTokens[0] : '';
    this.shuffleBag();
  }

  cleanBag(): void {
    this.tokens = [];
    this.extractedTokens = [];
    this.turnExtractedTokens = [];
    this.availableTokens = [...this.predefinedTokens];
    this.selectedToken = this.availableTokens.length > 0 ? this.availableTokens[0] : '';
  }

  openTurnDialog(): void {
    this.dialog.open(TurnDialogComponent, {
      data: { tokens: this.turnExtractedTokens },
      width: '400px',
    });
  }

  endTurn(): void {
    this.turnExtractedTokens = [];
  }

  shuffleBag(): void {
    for (let i = this.tokens.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.tokens[i], this.tokens[j]] = [this.tokens[j], this.tokens[i]];
    }
  }

  getTokenCounts(): { name: string, count: number }[] {
    const tokenCounts = this.tokens.reduce((acc, token) => {
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