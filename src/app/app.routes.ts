import { Routes } from '@angular/router';
import { CharactersComponent } from './features/characters/characters.component';
import { EpisodesComponent } from './features/episodes/episodes.component';
import { CharacterDetailsComponent } from './features/characters/character-details/character-details.component';
import { EpisodeDetailsComponent } from './features/episodes/episode-details/episode-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/characters', pathMatch: 'full' },
  { path: 'characters', component: CharactersComponent },
  { path: 'characters/:id', component: CharacterDetailsComponent },
  { 'path': 'episodes', component: EpisodesComponent },
  { 'path': 'episode/:id', component: EpisodeDetailsComponent }
];

