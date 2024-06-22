import { CharactersService } from './../service/characters.service';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Characters } from './characters.model';

@Component({
  selector: 'app-characters',
  standalone: false,
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent {

  personagens: Characters[] = []

  constructor(private charactersService: CharactersService) {
    this.obterPersonagensCadastrados();
  }

  obterPersonagensCadastrados(){
    this.charactersService.obterPersonagens()
    .subscribe(personagens => this.personagens = personagens)
  }
}
