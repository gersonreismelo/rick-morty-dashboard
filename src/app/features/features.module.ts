import { EpisodeDetailsComponent } from './episodes/episode-details/episode-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CharactersComponent } from './characters/characters.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { CharacterDetailsComponent } from './characters/character-details/character-details.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CharactersComponent,
    EpisodesComponent,
    CharacterDetailsComponent,
    EpisodeDetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    CharactersComponent,
    EpisodesComponent,
    CharacterDetailsComponent,
    EpisodeDetailsComponent
  ]
})
export class FeaturesModule { }
