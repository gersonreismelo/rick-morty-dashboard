import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { Characters } from "../characters/characters.model";
import { concatMap, map } from "rxjs/operators";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private url = environment.api;

  constructor(private httpClient: HttpClient) {}

  obterPersonagens(): Observable<Characters[]> {
    return this.recuperarPersonagensPorPagina(`${this.url}/character`);
  }

  private recuperarPersonagensPorPagina(url: string): Observable<Characters[]> {
    return this.httpClient.get<any>(url).pipe(
      concatMap(response => {
        const characters = response.results;
        const nextPageUrl = response.info.next;
        if (nextPageUrl) {
          return this.recuperarPersonagensPorPagina(nextPageUrl).pipe(
            map(nextCharacters => characters.concat(nextCharacters))
          );
        } else {
          return of(characters);
        }
      })
    );
  }
}
