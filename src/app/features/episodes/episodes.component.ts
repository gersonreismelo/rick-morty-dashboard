// episodes.component.ts

import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Services } from '../service/services';
import { Episodes } from './model/episodes.modal'
import { Router } from '@angular/router';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  episodes: Episodes[] = [];
  filteredEpisodes: Episodes[] = [];
  currentPage = 1;
  totalPages = 1;
  isLoading = false;

  constructor(private episodeService: Services, private router: Router) { }

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
          this.filteredEpisodes = this.episodes; // Inicialmente, mostrar todos os episódios
          this.totalPages = response.info.pages + 1;
          this.currentPage++;
          this.isLoading = false;
        },
        error => {
          console.error('Erro ao carregar episódios:', error);
          this.isLoading = false;
        }
      );
  }

  viewEpisodeDetails(episodeId: number | undefined): void {
    if (episodeId !== undefined) {
      this.router.navigate(['/episode', episodeId]);
    }
  }

  performSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase().trim();
    this.filteredEpisodes = this.episodes.filter(episode =>
      episode.name.toLowerCase().includes(searchTerm)
    );
  }

}
