import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigurationComponent } from './setup/configuration/configuration.component';
import { HttpApiInterceptor } from './interceptors/http-api.interceptor';
import { NavComponent } from './nav/nav.component';
import { DetailsComponent } from './movies/details/details.component';
import { MovieLatestComponent } from './movies/movie-latest/movie-latest.component';
import { PopularComponent } from './movies/popular/popular.component';
import { TopRatedComponent } from './movies/top-rated/top-rated.component';
import { UpcomingComponent } from './movies/upcoming/upcoming.component';
import { NowPlayingComponent } from './movies/now-playing/now-playing.component';
import { MaterialStuffModule } from './material-stuff.module';
import { AppLoaderDirective } from './directives/app-loader.directive';
import { ImageLoaderDirective } from './directives/image-loader.directive';
import { PopularPeopleComponent } from './people/popular-people/popular-people.component';
import { CelebDetailComponent } from './people/celeb-detail/celeb-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TvShowsListComponent } from './tv-show/tv-shows-list/tv-shows-list.component';
import { HomeComponent } from './main/home/home.component';
import { SharedModule } from './shared.module';
import { SearchComponent } from './misc/search/search.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ConfigurationComponent,
    NavComponent,
    HomeComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialStuffModule,
    SharedModule
  ],
  providers: [
    { provide: 'BASE_API_URL', useValue: 'https://api.themoviedb.org/3' },
    { provide: HTTP_INTERCEPTORS, useClass: HttpApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
