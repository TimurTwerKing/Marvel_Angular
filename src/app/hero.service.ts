import { Injectable } from '@angular/core';
import { Hero, HeroResponse } from './hero.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

// http://gateway.marvel.com/v1/public/comics?ts=patata&apikey=a5429f922174b203b81e088c38fe8adb&hash=d3ba2ef8f68132e2a7bbdbc80bcf9441


@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private url = 'https://gateway.marvel.com/v1/public';

  constructor(private http: HttpClient) { }

  public getHeroes(): Observable<Hero[]> {
    const offset = Math.floor(Math.random() * 1564);

    return this.http
      .get<HeroResponse>(`${this.url}/characters`, {
        params: {
          apikey: 'a5429f922174b203b81e088c38fe8adb',
          ts: 'patata',
          hash: 'd3ba2ef8f68132e2a7bbdbc80bcf9441',
          limit: '12',
          offset: offset.toString(),
        },
      })
      .pipe(map((response) => response.data.results));
  }

  public getPaginatedHeroes(
    page: number,
    itemsPerPage: number
  ): Observable<{ heroes: Hero[]; total: number }> {
    const offset = (page - 1) * itemsPerPage;

    return this.http
      .get<{ data: { results: Hero[]; total: number } }>(
        `${this.url}/characters`,
        {
          params: {
            apikey: 'a5429f922174b203b81e088c38fe8adb',
            ts: 'patata',
            hash: 'd3ba2ef8f68132e2a7bbdbc80bcf9441',
            limit: itemsPerPage.toString(),
            offset: offset.toString(),
          },
        }
      )
      .pipe(
        map((heroe) => ({
          heroes: heroe.data.results,
          total: heroe.data.total,
        })),
        catchError((error) => {
          console.error('Error al obtener héroes:', error);
          return of({ heroes: [], total: 0 });
        })
      );
  }

  public getHero(id: number): Observable<Hero> {
    return this.http
      .get<HeroResponse>(`${this.url}/characters/${id}`, {
        params: {
          apikey: 'a5429f922174b203b81e088c38fe8adb',
          ts: 'patata',
          hash: 'd3ba2ef8f68132e2a7bbdbc80bcf9441',
        },
      })
      .pipe(map((response) => response.data.results[0]));
  }

  public searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http
      .get<HeroResponse>(`${this.url}/characters`, {
        params: {
          nameStartsWith: term.trim(),
          apikey: 'a5429f922174b203b81e088c38fe8adb',
          ts: 'patata',
          hash: 'd3ba2ef8f68132e2a7bbdbc80bcf9441',
        },
      })
      .pipe(map((response) => response.data.results));
  }
}
