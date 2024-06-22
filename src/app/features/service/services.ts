// characters.service.ts

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

import { Observable, forkJoin } from 'rxjs';
import { Characters } from "../characters/models/characters.model";
import { Episodes } from "../episodes/model/episodes.modal";

@Injectable({
  providedIn: 'root'
})
export class Services {

  private url = environment.api;

  constructor(private httpClient: HttpClient) {}

  obterPersonagens(page: number): Observable<{ info: any, results: Characters[] }> {
    const url = `${this.url}/character?page=${page}`;
    return this.httpClient.get<{ info: any, results: Characters[] }>(url);
  }

  obterPersonagensUrl(characterUrls: string[]): Observable<Characters[]> {
    const requests = characterUrls.map(url => this.httpClient.get<Characters>(url));
    return forkJoin(requests);
  }

  obterPersonagem(id: number): Observable<Characters> {
    return this.httpClient.get<Characters>(`${this.url}/character/${id}`);
  }

  obterEpisodes(page: number): Observable<{ info: any, results: Episodes[] }> {
    const url = `${this.url}/episode?page=${page}`;
    return this.httpClient.get<{ info: any, results: Episodes[] }>(url);
  }

  obterEpisodios(episodeUrls: string[]): Observable<Episodes[]> {
    const requests = episodeUrls.map(url => this.httpClient.get<Episodes>(url));
    return forkJoin(requests);
  }

  obterEpisodio(id: number): Observable<Episodes> {
    return this.httpClient.get<Episodes>(`${this.url}/episode/${id}`);
  }
}
