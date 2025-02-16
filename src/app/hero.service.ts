import { Injectable } from '@angular/core';
import { Hero, HeroResponse } from './hero.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private readonly url = 'https://gateway.marvel.com/v1/public';
  private readonly apiParams = {
    apikey: 'a5429f922174b203b81e088c38fe8adb',
    ts: 'patata',
    hash: 'd3ba2ef8f68132e2a7bbdbc80bcf9441',
  };

  constructor(private http: HttpClient) { }

  public getHeroes(totalCount: number): Observable<Hero[]> {
    const offset = Math.floor(Math.random() * totalCount);
    return this.http
      .get<HeroResponse>(`${this.url}/characters`, {
        params: { ...this.apiParams, limit: '12', offset: offset.toString() },
      })
      .pipe(
        map((response) => response.data.results),
        catchError((error) => {
          console.error('Error al obtener héroes:', error);
          return of([]);
        })
      );
  }

  public getPaginatedHeroes(page: number, itemsPerPage: number): Observable<{ heroes: Hero[]; total: number }> {
    const offset = (page - 1) * itemsPerPage;
    return this.http
      .get<HeroResponse>(`${this.url}/characters`, {
        params: { ...this.apiParams, limit: itemsPerPage.toString(), offset: offset.toString() },
      })
      .pipe(
        map((response) => ({ heroes: response.data.results, total: response.data.total })),
        catchError((error) => {
          console.error('Error al obtener héroes paginados:', error);
          return of({ heroes: [], total: 0 });
        })
      );
  }

  public getHero(id: number): Observable<Hero> {
    return this.http
      .get<HeroResponse>(`${this.url}/characters/${id}`, {
        params: this.apiParams,
      })
      .pipe(
        map((response) => response.data.results[0]),
        catchError((error) => {
          console.error(`Error al obtener héroe con ID ${id}:`, error);
          return of(null as unknown as Hero);
        })
      );
  }

  public searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<HeroResponse>(`${this.url}/characters`, {
        params: { ...this.apiParams, nameStartsWith: term.trim() },
      })
      .pipe(
        map((response) => response.data.results),
        catchError((error) => {
          console.error(`Error al buscar héroes con el término "${term}":`, error);
          return of([]);
        })
      );
  }
}
