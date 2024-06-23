import { Routes } from '@angular/router';
import { CharactersComponent } from './features/characters/characters.component';
import { EpisodesComponent } from './features/episodes/episodes.component';
import { CharacterDetailsComponent } from './features/characters/character-details/character-details.component';
import { EpisodeDetailsComponent } from './features/episodes/episode-details/episode-details.component';
import { LoginComponent } from './features/login/login.component';
import { ProfileComponent } from './features/profile/profile.component';

export const routes: Routes = [
  { path: 'characters', component: CharactersComponent },
  { path: 'characters/:id', component: CharacterDetailsComponent },
  { 'path': 'episodes', component: EpisodesComponent },
  { 'path': 'episode/:id', component: EpisodeDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

