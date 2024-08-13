import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component'; // Assicurati di importare HomeComponent
import { NotFoundComponent } from './component/notFoud/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
 
  // Aggiungi qui altre rotte protette

  // Questa rotta deve essere sempre alla fine
  { path: '**', component: NotFoundComponent},
];
