import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component'; // Assicurati di importare HomeComponent
import { NotFoundComponent } from './component/notFoud/not-found.component';
import { ArkhamHorrorToolsComponent } from './component/arkham-horror-tools/arkham-horror-tools.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'arkham-horror-tools', component: ArkhamHorrorToolsComponent },
 
  // Aggiungi qui altre rotte protette

  // Questa rotta deve essere sempre alla fine
  { path: '**', component: NotFoundComponent},
];
