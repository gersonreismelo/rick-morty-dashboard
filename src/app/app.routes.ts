import { Routes } from '@angular/router';
import { CharactersComponent } from './features/characters/characters.component';
import { EpisodesComponent } from './features/episodes/episodes.component';

export const routes: Routes = [
  { 'path': '', component: CharactersComponent },
  { 'path': 'episodes', component: EpisodesComponent }
];

