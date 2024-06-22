// character-details.component.ts

import { CharactersService } from './../../service/characters.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Characters } from '../models/characters.model';
import { Episodes } from '../../episodes/model/episodes.modal';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {

  character: Characters | undefined;
  episodes: Episodes[] = [];

  constructor(
    private route: ActivatedRoute,
    private charactersService: CharactersService
  ) { }

  ngOnInit(): void {
    const characterId = +this.route.snapshot.params['id'];
    if (characterId) {
      this.charactersService.obterPersonagem(characterId).subscribe(
        character => {
          this.character = character;
          this.loadEpisodes(character.episode);
        },
        error => console.error('Erro ao carregar personagem:', error)
      );
    }
  }

  loadEpisodes(episodeUrls: string[]): void {
    this.charactersService.obterEpisodios(episodeUrls).subscribe(
      episodes => this.episodes = episodes,
      error => console.error('Erro ao carregar episódios:', error)
    );
  }
}
