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
import { AppLoaderDirective } from '../directives/app-loader.directive';
import { ImageLoaderDirective } from '../directives/image-loader.directive';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    DetailsComponent,
    MovieLatestComponent,
    PopularComponent,
    TopRatedComponent,
    UpcomingComponent,
    NowPlayingComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MaterialStuffModule,
    SharedModule
  ],
})
export class MoviesModule {}
