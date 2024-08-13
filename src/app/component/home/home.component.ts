import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';

interface Feature {
  name: string;
  path: string;
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  features: Feature[] = [
    { name: 'Arkham horror tools', path: '/arkham-horror-tools' }
  ];

  constructor(private router: Router) {}

  public navigateToFeature(path: string): void {
    this.router.navigate([path]);
  }
}
