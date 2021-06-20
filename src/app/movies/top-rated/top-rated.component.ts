import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { MoviesService } from 'src/app/services/movies.service';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.scss'],
})
export class TopRatedComponent implements OnInit, OnDestroy {
  private toUnsubscribe$ = new Subject();

  topRatedList: any[] = [];

  page = 1;
  pageLength = 0;
  pageSize = 10;
  pages = [10, 20, 50];

  loadingTopRated = false;

  constructor(
    private _movieService: MoviesService,
    public _configurationService: ConfigurationService,
    private dialog: MatDialog,
    private title: Title
  ) {
    this.title.setTitle('Top Rated Movies - Moviest');
  }

  ngOnInit(): void {
    this.getTopRatedMovies();
  }

  ngOnDestroy() {
    this.toUnsubscribe$.next();
    this.toUnsubscribe$.complete();
  }

  getTopRatedMovies() {
    this.loadingTopRated = true;
    this._movieService
      .getTopRatedMovies(this.page)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((data: any) => {
        this.loadingTopRated = false;
        this.topRatedList = data.results;
        this.pageLength = data.total_results;
      });
  }

  pageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getTopRatedMovies();
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
