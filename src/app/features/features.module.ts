import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CharactersComponent } from './characters/characters.component';
import { EpisodesComponent } from './episodes/episodes.component';


@NgModule({
  declarations: [
    CharactersComponent,
    EpisodesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    CharactersComponent,
    EpisodesComponent
  ]
})
export class FeaturesModule { }
