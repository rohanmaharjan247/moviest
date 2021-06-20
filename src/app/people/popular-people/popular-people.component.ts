import { HttpEvent, HttpEventType } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { from, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { PeopleService } from 'src/app/services/people.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-popular-people',
  templateUrl: './popular-people.component.html',
  styleUrls: ['./popular-people.component.scss'],
})
export class PopularPeopleComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  private toUnsubscribe$ = new Subject<void>();

  popularList: any[] = [];
  loadingPopularPeople = false;

  page = 1;
  pageLength = 0;
  pageSize = 10;
  pages = [10, 20, 50];

  searchText = new FormControl(null);

  constructor(
    private _peopleService: PeopleService,
    public _configurationService: ConfigurationService,
    private _searchService: SearchService,
    private title: Title
  ) {
    this.title.setTitle('Popular People - Moviest')
  }
  ngAfterViewInit(): void {
    this.searchText.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(e => this.loadingPopularPeople =true),
        switchMap((e) =>
          (e.length>=3)? this._searchService.searchPeople(this.searchText.value): this._peopleService.getPopularPeople(this.page)
        )
      )
      .subscribe((data: HttpEvent<any>) => {
        console.log(data, 'searched people');
        if(data.type === HttpEventType.Response){
          this.popularList = data.body.results;
          this.pageLength = data.body.total_results;
          this.loadingPopularPeople = false;
        }
      });
  }
  ngOnDestroy(): void {
    this.toUnsubscribe$.next();
    this.toUnsubscribe$.complete();
  }

  ngOnInit(): void {
    this.getPopularPeople();
  }

  getPopularPeople() {
    this.loadingPopularPeople = true;
    this._peopleService
      .getPopularPeople(this.page)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((data: HttpEvent<any>) => {
        if (data.type === HttpEventType.Response) {
          this.popularList = data.body.results;
          this.pageLength = data.body.total_results;
          this.loadingPopularPeople = false;
        }
      });
  }

  getEventProgress(event: HttpEvent<any>) {
    console.log(event);
    switch (event.type) {
      case HttpEventType.Sent:
        return `Loading People`;
      case HttpEventType.ResponseHeader:
        return `Response Header`;
      case HttpEventType.DownloadProgress:
        const percentDone = Math.round(
          (100 * event.loaded) / (event.total ?? 0)
        );
        return `Loading ${percentDone}% complete`;
      case HttpEventType.Response:
        return 'Done';
      default:
        return `Failed event type: ${event.type}`;
    }
  }

  pageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getPopularPeople();
  }
}
