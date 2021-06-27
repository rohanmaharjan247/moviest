import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MaterialStuffModule } from '../material-stuff.module';
import { NowPlayingComponent } from './now-playing/now-playing.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { TopRatedComponent } from './top-rated/top-rated.component';
import { PopularComponent } from './popular/popular.component';
import { MovieLatestComponent } from './movie-latest/movie-latest.component';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from '../shared.module';
import { SafeUrlPipe } from '../pipes/safe-url.pipe';

@NgModule({
  declarations: [
    DetailsComponent,
    MovieLatestComponent,
    PopularComponent,
    TopRatedComponent,
    UpcomingComponent,
    NowPlayingComponent,
    SafeUrlPipe
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MaterialStuffModule,
    SharedModule
  ],
})
export class MoviesModule {}
