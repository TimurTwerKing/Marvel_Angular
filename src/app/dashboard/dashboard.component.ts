import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeroSearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  loading = false;
  private destroy$ = new Subject<void>(); // Manejo de desuscripciones

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.loadRandomHeroes();
  }

  loadRandomHeroes(): void {
    this.loading = true;
    const totalCount = 100; // Example total count, replace with actual value
    this.heroService
      .getHeroes(totalCount)
      .pipe(takeUntil(this.destroy$)) // Evita memory leaks
      .subscribe((heroes) => {
        this.heroes = heroes;
        this.loading = false;
      });
  }

  trackById(index: number, hero: Hero): number {
    return hero.id;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
