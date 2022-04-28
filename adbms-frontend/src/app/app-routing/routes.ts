import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { MoviesComponent } from '../movies/movies.component';
import { TvComponent } from '../tv/tv.component';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'tvshows', component: TvComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];