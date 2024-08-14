import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { TurnDialogComponent } from './turn-dialog/turn-dialog.component';
import { InitBagDialogComponent } from './init-bag-dialog/init-bag-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  tokens: { name: string }[] = [];
  extractedTokens: { name: string }[] = [];
  turnExtractedTokens: { name: string }[] = [];

  predefinedTokens: string[] = ['EVENTO', 'DESTINI', 'TERRORE', 'PORTALE', 'RESA DEI CONTI', 'VUOTO', 'MOSTRO', 'QUOTIDIANO'];
  availableTokens: string[] = [...this.predefinedTokens];
  selectedToken: string = this.availableTokens[0];
  version: string = '1.0.6';
  lastTokenDrawn: Token[] = [];
  isInitBag = false;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}



  showLastTokenDrawn(): void {
    // Mostra il toast con i token estratti
    this.snackBar.open(`Extracted Tokens: ${this.lastTokenDrawn.map(token => token.name).join(', ')}`, '', {
      duration: 3000,
      panelClass: ["custom-snackbar"]
    });
  }

  drawTokens(count: number): void {
    this.lastTokenDrawn =  [];  // Per tenere traccia dei token estratti

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
      this.lastTokenDrawn.push(drawnToken);  // Aggiungi il token estratto alla lista temporanea
      count--;
    }

    // Mostra il toast con i token estratti
    this.snackBar.open(`Extracted Tokens: ${this.lastTokenDrawn.map(token => token.name).join(', ')}`, '', {
      duration: 3000,
      panelClass: 'custom-snackbar'
    });
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
    this.isInitBag = false;
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

  openInitBagDialog(): void {
    const dialogRef = this.dialog.open(InitBagDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result:{ name: string, count: number }[]) => {
      if (result) {
        // Popola la bag con i token selezionati, escludendo quelli con count 0
        this.tokens = [];
        result.forEach(token => {
          if (token.count > 0) {
            for (let i = 0; i < token.count; i++) {
              this.tokens.push({ name: token.name });
            }
          }
        });
        this.shuffleBag();
        this.isInitBag = true;
      }
    });
  }

  openAddTokenDialog(): void {
    const dialogRef = this.dialog.open(InitBagDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: { name: string, count: number }[]) => {
      if (result) {
        // Aggiungi i token selezionati alla bag esistente, escludendo quelli con count 0
        result.forEach(token => {
          if (token.count > 0) {
            for (let i = 0; i < token.count; i++) {
              this.tokens.push({ name: token.name });
            }
          }
        });
        this.shuffleBag();
      }
    });
  }
}