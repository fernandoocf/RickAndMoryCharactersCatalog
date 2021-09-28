import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  CHARACTER_URL: string = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  getCharactersByPage(page:number) {
    return this.http.get(`${this.CHARACTER_URL}?page=${page}`);
  }

  getFirstEpsodeOfCharacter(URL:string) {
    return this.http.get(URL);
  }

}
