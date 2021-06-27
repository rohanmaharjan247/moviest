import { HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HomeService } from 'src/app/services/home.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  private toUnsubscribe$ = new Subject<void>();

  searchQuery = '';

  searchResult: any;

  constructor(
    private avRouter: ActivatedRoute,
    private _homeService: HomeService,
    private title: Title,
    public _config: ConfigurationService,
    private _searchService: SearchService
  ) {
    console.log(this.avRouter.snapshot.queryParams, 'query params');
    this.searchQuery = this.avRouter.snapshot.queryParams.query;
    this.title.setTitle(`${this.searchQuery} - Moviest`);
  }
  ngOnDestroy(): void {
    this.toUnsubscribe$.next();
    this.toUnsubscribe$.complete();
  }

  ngOnInit(): void {
    this.searchAll();
  }

  searchAll() {
    this._homeService
      .searchAll(this.searchQuery)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((data: any) => {
        console.log(data, 'search');
        this.searchResult = data.results;
      });
  }

  searchMovie() {
    this._searchService
      .searchMovie(this.searchQuery)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((data: any) => {
        console.log(data, 'search movie');
        this.searchResult = data.results.map((o:any)=> ({...o, media_type: 'movie'}));
        console.log(this.searchResult, 'search movie');
      });
  }

  searchTv() {
    this._searchService
      .searchTVShow(this.searchQuery)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((data: any) => {
        this.searchResult = data.results.map((o:any)=> ({...o, media_type: 'tv'}));

        console.log(this.searchResult, 'search tv');
      });
  }

  searchPeople() {
    this._searchService
      .searchPeople(this.searchQuery)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((data: any) => {
        console.log(data, 'search person');
        if(data.type === HttpEventType.Response){
          this.searchResult = data.body.results.map((o:any)=> ({...o, media_type: 'person'}));
          console.log(this.searchResult, 'search person');
        }
      });
  }

  selectSearchCategory(category: string) {
    switch (category) {
      case 'movie':
        this.searchMovie();
        break;
      case 'tv':
        this.searchTv();
        break;
      case 'person':
        this.searchPeople();
        break;
      default:
        this.searchAll();
    }
  }
}
