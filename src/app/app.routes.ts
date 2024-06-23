import { Routes } from '@angular/router';
import { CharactersComponent } from './features/characters/characters.component';
import { EpisodesComponent } from './features/episodes/episodes.component';
import { CharacterDetailsComponent } from './features/characters/character-details/character-details.component';
import { EpisodeDetailsComponent } from './features/episodes/episode-details/episode-details.component';
import { LoginComponent } from './features/login/login.component';
import { ProfileComponent } from './features/profile/profile.component';
import { AuthGuard } from './features/service/auth.guard';

export const routes: Routes = [
  { path: 'characters', component: CharactersComponent, canActivate: [AuthGuard] },
  { path: 'characters/:id', component: CharacterDetailsComponent, canActivate: [AuthGuard] },
  { 'path': 'episodes', component: EpisodesComponent, canActivate: [AuthGuard] },
  { 'path': 'episode/:id', component: EpisodeDetailsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

