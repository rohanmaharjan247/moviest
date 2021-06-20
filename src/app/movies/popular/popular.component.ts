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
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],
})
export class PopularComponent implements OnInit, OnDestroy {
  private toUnsubscribe$ = new Subject();

  popularList: any[] = [];

  page = 1;
  pageLength = 0;
  pageSize = 10;
  pages = [10, 20, 50];

  loadingPopular = false;

  constructor(
    private _movieService: MoviesService,
    public _configurationService: ConfigurationService,
    private dialog: MatDialog,
    private title: Title
  ) {
    this.title.setTitle('Popular Movies - Moviest')
  }

  ngOnInit(): void {
    this.getPopularMovies();
  }

  ngOnDestroy() {
    this.toUnsubscribe$.next();
    this.toUnsubscribe$.complete();
  }

  getPopularMovies() {
    this.loadingPopular = true;
    this._movieService
      .getPopularMovies(this.page)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((data: any) => {
        this.loadingPopular = false;
        this.popularList = data.results;
        this.pageLength = data.total_results;
      });
  }
  pageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getPopularMovies();
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
