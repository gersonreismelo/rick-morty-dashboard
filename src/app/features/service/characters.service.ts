// characters.service.ts

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Characters } from "../characters/characters.model";
import { Observable } from "rxjs";

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
}
