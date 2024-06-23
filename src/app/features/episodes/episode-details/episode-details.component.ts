import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Characters } from '../../characters/models/characters.model';
import { Episodes } from '../model/episodes.modal';
import { Services } from '../../service/services';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.scss']
})
export class EpisodeDetailsComponent implements OnInit {

  episode: Episodes | undefined; 
  characters: Characters[] = [];

  constructor(
    private route: ActivatedRoute,
    private charactersService: Services 
  ) { }

  ngOnInit(): void {
    const episodeId = +this.route.snapshot.params['id'];
    if (episodeId) {
      this.charactersService.getEpisodeId(episodeId).subscribe(
        episode => {
          this.episode = episode; 
          this.loadCharacters(episode.characters); 
        },
        error => console.error('Error loading episode:', error)
      );
    }
  }

  loadCharacters(characterUrls: string[]): void {
    this.charactersService.getCharactersUrl(characterUrls).subscribe(
      characters => this.characters = characters,
      error => console.error('Error loading characters:', error)
    );
  }

}
