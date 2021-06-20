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
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss'],
})
export class UpcomingComponent implements OnInit, OnDestroy {
  private toUnsubscribe$ = new Subject();

  upcomingList: any[] = [];

  page = 1;
  pageLength = 0;
  pageSize = 10;
  pages = [10, 20, 50];

  loadingUpcoming = false;

  constructor(
    private _movieService: MoviesService,
    public _configurationService: ConfigurationService,
    private dialog: MatDialog,
    private title: Title
  ) {
    this.title.setTitle('Upcoming Movies - Moviest')
  }

  ngOnInit(): void {
    this.getUpcomingMovies();
  }

  ngOnDestroy() {
    this.toUnsubscribe$.next();
    this.toUnsubscribe$.complete();
  }

  getUpcomingMovies() {
    this.loadingUpcoming = true;
    this._movieService
      .getUpcomingMovies(this.page)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((data: any) => {
        this.upcomingList = data.results.sort((a:any, b:any)=> {return b.release_date - a.release_date});
        this.pageLength = data.total_results;
        this.loadingUpcoming = false;
      });
  }

  pageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getUpcomingMovies();
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
