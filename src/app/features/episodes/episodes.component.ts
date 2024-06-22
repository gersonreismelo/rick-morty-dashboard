import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CharactersService } from './../service/characters.service';
import { Episodes } from './model/episodes.modal';
import { EpisodesService } from '../service/episodes.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.scss'
})
export class EpisodesComponent
implements OnInit {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  episodes: Episodes[] = [];
  currentPage = 1;
  totalPages = 1;
  isLoading = false;

  constructor(private episodeService: EpisodesService) { }

  ngOnInit(): void {
    this.loadEpisodes();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    if (this.isLoading || this.currentPage >= this.totalPages) {
      return;
    }
    const scrollHeight = this.scrollContainer.nativeElement.scrollHeight;
    const scrollTop = this.scrollContainer.nativeElement.scrollTop;
    const clientHeight = this.scrollContainer.nativeElement.clientHeight;
    const scrollBottom = scrollHeight - scrollTop - clientHeight;

    if (scrollBottom < 200) {
      this.loadEpisodes();
    }
  }

  loadEpisodes(): void {
    this.isLoading = true;
    this.episodeService.obterEpisodes(this.currentPage)
      .subscribe(
        response => {
          this.episodes.push(...response.results);
          this.totalPages = response.info.pages + 1;
          this.currentPage++;
          this.isLoading = false;
        },
        error => {
          console.error('Erro ao carregar episodes:', error);
          this.isLoading = false;
        }
      );
  }

}
