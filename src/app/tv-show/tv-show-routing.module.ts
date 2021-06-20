import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from '../tv-show/details/details.component';
import { TvShowsListComponent } from './tv-shows-list/tv-shows-list.component';

const routes: Routes = [
  {path: 'popular', component:TvShowsListComponent},
  {path: 'top-rated', component: TvShowsListComponent},
  {path: 'on-air', component: TvShowsListComponent},
  {path: 'airing-today', component: TvShowsListComponent},
  {path: 'details/:id', component:DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TvShowRoutingModule { }
