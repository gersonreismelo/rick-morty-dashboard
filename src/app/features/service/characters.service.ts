// characters.service.ts

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

import { Observable, forkJoin } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { Characters } from "../characters/models/characters.model";
import { Episodes } from "../episodes/model/episodes.modal";

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private url = environment.api;

  constructor(private httpClient: HttpClient) {}

  obterPersonagens(page: number): Observable<{ info: any, results: Characters[] }> {
    const url = `${this.url}/character?page=${page}`;
    return this.httpClient.get<{ info: any, results: Characters[] }>(url);
  }

  obterPersonagem(id: number): Observable<Characters> {
    return this.httpClient.get<Characters>(`${this.url}/character/${id}`);
  }

  obterEpisodios(episodeUrls: string[]): Observable<Episodes[]> {
    const requests = episodeUrls.map(url => this.httpClient.get<Episodes>(url));
    return forkJoin(requests);
  }
}
