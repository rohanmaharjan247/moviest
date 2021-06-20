import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvShowRoutingModule } from './tv-show-routing.module';
import { TvShowsListComponent } from './tv-shows-list/tv-shows-list.component';
import { SharedModule } from '../shared.module';
import { MaterialStuffModule } from '../material-stuff.module';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    TvShowsListComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    TvShowRoutingModule,
    SharedModule,
    MaterialStuffModule
  ],
  providers:[]
})
export class TvShowModule { }
