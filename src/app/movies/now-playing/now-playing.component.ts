import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { MoviesService } from 'src/app/services/movies.service';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss'],
})
export class NowPlayingComponent implements OnInit, OnDestroy {
  private _toUnsubscribe$ = new Subject();

  nowPlayingList: any[] = [];

  page = 1;
  pageLength = 0;
  pageSize = 10;
  pages = [10, 20, 50];

  loadingNowPlaying = false;

  constructor(
    private _moviesService: MoviesService,
    public _configurationService: ConfigurationService,
    private dialog: MatDialog,
    private title: Title
  ) {
    this.title.setTitle('Now Playing - Movies');
  }

  ngOnDestroy() {
    this._toUnsubscribe$.next();
    this._toUnsubscribe$.complete();
  }

  ngOnInit(): void {
    this.getNowPlaying();
  }

  getNowPlaying() {
    this.loadingNowPlaying = true;
    this._moviesService
      .getNowPlayingMovies(this.page)
      .pipe(takeUntil(this._toUnsubscribe$))
      .subscribe((data: any) => {
        this.nowPlayingList = data.results;
        this.pageLength = data.total_results;
        this.loadingNowPlaying = false;
      });
  }

  pageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getNowPlaying();
  }

  openDialog(id: number) {
    this.dialog.open(DetailsComponent, {
      data: {
        movieId: id,
      },
      panelClass: 'custom-dialog-container',
    });
  }
}
