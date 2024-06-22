import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Episodes } from './../episodes/episodes.modal';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  private url = environment.api;

  constructor(private httpClient: HttpClient) {}

  obterEpisodes(page: number): Observable<{ info: any, results: Episodes[] }> {
    const url = `${this.url}/episode?page=${page}`;
    return this.httpClient.get<{ info: any, results: Episodes[] }>(url);
  }
}
