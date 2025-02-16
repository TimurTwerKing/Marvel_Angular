import { Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: "heroes",
        component: HeroesComponent
    },
    {
        path: "hero/:id",
        component: HeroDetailComponent
    },
    {
        path: "dashboard",
        component: DashboardComponent
    },
    {
        path: "**",
        redirectTo: "dashboard"
    },
    {
        path: "characters/:id",
        redirectTo: "hero/:id"
    }
  
];
