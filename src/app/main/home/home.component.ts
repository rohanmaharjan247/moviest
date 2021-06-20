import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { TitleCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HomeService } from 'src/app/services/home.service';
import { MoviesService } from 'src/app/services/movies.service';
import { TvShowService } from 'src/app/services/tv-show.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [TitleCasePipe],
  animations: [
    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(':enter', [
          style({ opacity: 0, width: '0px' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, width: '*' })),
          ]),
        ], { optional: true })
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
          ]),
        ])
      ]),
    ]),
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  private toUnsubscribe$ = new Subject<void>();

  mediaType = 'all';
  popularMediaType = 'movie';

  trendingList: any;

  trendingTitle = 'All';

  popularList: any;

  searchQuery = new FormControl(null);

  isOpen = true;

  constructor(
    private title: Title,
    private _homeService: HomeService,
    public _configurationService: ConfigurationService,
    private titleCase: TitleCasePipe,
    private _movieService: MoviesService,
    private _tvShowService: TvShowService,
    private router: Router
  ) {
    this.title.setTitle('Home - Moviest');
  }
  ngOnDestroy(): void {
    this.toUnsubscribe$.next();
    this.toUnsubscribe$.complete();
  }

  ngOnInit(): void {
    this.getTrending();
    this.selectTabPopular('movie');
  }

  getTrending() {
    this._homeService
      .getTrending(this.mediaType, 'day')
      .pipe(
        map((m: any) => {
          return m.results.slice(0, 6);
        }),
        takeUntil(this.toUnsubscribe$)
      )
      .subscribe((data: any) => {
        console.log(data, 'trending');
        this.trendingList = data;
      });
  }

  getPopularMovie() {
    this._movieService
      .getPopularMovies(1)
      .pipe(
        map((m: any) => {
          return m.results.slice(0, 6);
        }),
        takeUntil(this.toUnsubscribe$)
      )
      .subscribe((data: any) => {
        this.popularList = data;
      });
  }

  getPopularTvShow() {
    this._tvShowService
      .getTvShowPopular(1)
      .pipe(
        map((m: any) => {
          return m.results.slice(0, 6);
        }),
        takeUntil(this.toUnsubscribe$)
      )
      .subscribe((data: any) => {
        this.popularList = data;
      });
  }

  toggle(){
    this.isOpen = !this.isOpen;
  }

  searchAll() {
    if(this.searchQuery.value && this.searchQuery.value != ""){
      this.router.navigate(['/search'], {
        queryParams: { query: this.searchQuery.value },
      });
    }
  }

  selectTab(mediaType: 'all' | 'movie' | 'tv' | 'person') {
    this.mediaType = mediaType;
    this.trendingTitle = this.titleCase.transform(mediaType);
    this.getTrending();
  }

  selectTabPopular(mediaType: 'movie' | 'tv') {
    this.popularMediaType = mediaType;
    switch (mediaType) {
      case 'movie':
        this.getPopularMovie();
        break;
      case 'tv':
        this.getPopularTvShow();
        break;
    }
  }
}
