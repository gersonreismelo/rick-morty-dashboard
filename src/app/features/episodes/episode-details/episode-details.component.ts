import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Characters } from '../../characters/models/characters.model';
import { Episodes } from '../model/episodes.modal';
import { Services } from '../../service/services'; // Importar o serviço correto aqui

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.scss']
})
export class EpisodeDetailsComponent implements OnInit {

  episode: Episodes | undefined; // Renomeei de episodes para episode
  characters: Characters[] = [];

  constructor(
    private route: ActivatedRoute,
    private charactersService: Services // Certifique-se de importar o serviço correto aqui
  ) { }

  ngOnInit(): void {
    const episodeId = +this.route.snapshot.params['id'];
    if (episodeId) {
      this.charactersService.obterEpisodio(episodeId).subscribe(
        episode => {
          this.episode = episode; // Atribuir o episódio retornado
          this.loadCharacters(episode.characters); // Chamar o método correto
        },
        error => console.error('Erro ao carregar episódio:', error)
      );
    }
  }

  loadCharacters(characterUrls: string[]): void {
    this.charactersService.obterPersonagensUrl(characterUrls).subscribe(
      characters => this.characters = characters,
      error => console.error('Erro ao carregar personagens:', error)
    );
  }

}
