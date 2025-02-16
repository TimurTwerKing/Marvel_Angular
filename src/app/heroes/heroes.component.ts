import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-heroes',
  imports: [RouterModule],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
})
export class HeroesComponent implements OnInit {
  public heroes: Hero[] = [];
  totalHeroes: number = 0;
  currentPage: number = 1;
  heroesPerPage: number = 20;
  totalPages: number = 0;
  loading = false;

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.loadHeroes();
  }

  loadHeroes(): void {
    this.loading = true;
    this.heroService
      .getPaginatedHeroes(this.currentPage, this.heroesPerPage)
      .subscribe((heroe) => {
        this.heroes = heroe.heroes;
        this.totalHeroes = heroe.total;
        this.totalPages = Math.ceil(this.totalHeroes / this.heroesPerPage);
        this.loading = false;
      });
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadHeroes();
    }
  }
}
