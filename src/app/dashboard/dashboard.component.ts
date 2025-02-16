import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, switchMap, tap, } from 'rxjs';
import { HeroSearchComponent } from '../hero-search/hero-search.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, FormsModule, HeroSearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  loading = false;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.loadRandomHeroes();
  }

  loadRandomHeroes(): void {

    this.loading = true;

    this.heroService.getHeroes().subscribe((heroe) => {
      this.heroes = heroe;
      this.loading = false;
    });
  }
}
