import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

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

  tokens: Token[] = [];
  extractedTokens: Token[] = [];
  tokenName: string = '';
  tokenCount: number = 1;

  addToken(): void {
    for (let i = 0; i < this.tokenCount; i++) {
      this.tokens.push({ name: this.tokenName });
    }
    this.tokenName = '';
    this.tokenCount = 1;
  }

  drawTokens(count: number): void {
    while (count > 0) {
      if (this.tokens.length === 0) {
        // Remischia i token estratti nel sacchetto
        this.tokens = [...this.extractedTokens];
        this.extractedTokens = [];
      }
      const index = Math.floor(Math.random() * this.tokens.length);
      this.extractedTokens.push(this.tokens.splice(index, 1)[0]);
      count--;
    }
  }

  shaffleBag(): void {
    this.tokens = [...this.tokens, ...this.extractedTokens];
    this.extractedTokens = [];
  }

  cleanBag(): void {
    this.tokens = [];
    this.extractedTokens = [];
  }
}