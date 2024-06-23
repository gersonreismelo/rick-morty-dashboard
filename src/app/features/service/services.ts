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

  getCharacters(page: number): Observable<{ info: any, results: Characters[] }> {
    const url = `${this.url}/character?page=${page}`;
    return this.httpClient.get<{ info: any, results: Characters[] }>(url);
  }

  getCharactersUrl(characterUrls: string[]): Observable<Characters[]> {
    const requests = characterUrls.map(url => this.httpClient.get<Characters>(url));
    return forkJoin(requests);
  }

  getCharacter(id: number): Observable<Characters> {
    return this.httpClient.get<Characters>(`${this.url}/character/${id}`);
  }

  getEpisodes(page: number): Observable<{ info: any, results: Episodes[] }> {
    const url = `${this.url}/episode?page=${page}`;
    return this.httpClient.get<{ info: any, results: Episodes[] }>(url);
  }

  getEpisodesUrl(episodeUrls: string[]): Observable<Episodes[]> {
    const requests = episodeUrls.map(url => this.httpClient.get<Episodes>(url));
    return forkJoin(requests);
  }

  getEpisodeId(id: number): Observable<Episodes> {
    return this.httpClient.get<Episodes>(`${this.url}/episode/${id}`);
  }
}
