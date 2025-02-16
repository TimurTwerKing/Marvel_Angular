import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hero } from '../hero.interface';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../hero.service';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  hero: Hero | undefined;
  loading = false;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.loading = true;
    this.heroService.getHero(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(hero => {
        this.hero = hero;
        this.loading = false;
      });
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
