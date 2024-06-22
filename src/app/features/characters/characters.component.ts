// characters.component.ts

import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Services } from '../service/services';
import { Characters } from './models/characters.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  personagens: Characters[] = [];
  filteredPersonagens: Characters[] = [];
  currentPage = 1;
  totalPages = 1;
  isLoading = false;

  constructor(private services: Services, private router: Router) { }

  ngOnInit(): void {
    this.loadCharacters();
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
      this.loadCharacters();
    }
  }

  loadCharacters(): void {
    this.isLoading = true;
    this.services.obterPersonagens(this.currentPage)
      .subscribe(
        response => {
          this.personagens.push(...response.results);
          this.filteredPersonagens = this.personagens; // Inicialmente, mostrar todos os personagens
          this.totalPages = response.info.pages + 1;
          this.currentPage++;
          this.isLoading = false;
        },
        error => {
          console.error('Erro ao carregar personagens:', error);
          this.isLoading = false;
        }
      );
  }

  viewCharacterDetails(characterId: number | undefined): void {
    if (characterId !== undefined) {
      this.router.navigate(['/characters', characterId]);
    }
  }

  performSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase().trim();
    this.filteredPersonagens = this.personagens.filter(character =>
      character.name.toLowerCase().includes(searchTerm)
    );
  }
  
}
