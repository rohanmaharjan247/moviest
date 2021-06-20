import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { TvShowService } from 'src/app/services/tv-show.service';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-tv-shows-list',
  templateUrl: './tv-shows-list.component.html',
  styleUrls: ['./tv-shows-list.component.scss'],
  providers: [TitleCasePipe],
})
export class TvShowsListComponent implements OnInit {
  private toUnsubscribe$ = new Subject<void>();
  page = 1;
  pageLength = 0;
  pageSize = 10;
  pages = [10, 20, 50];

  tvShowList: any;

  url = '';

  loadingTvShow = false;

  headingTile = '';

  constructor(
    private _tvShowService: TvShowService,
    private title: Title,
    private avRoute: ActivatedRoute,
    private titleCase: TitleCasePipe,
    public _configurationService: ConfigurationService,
    private dialog: MatDialog
  ) {
    console.log(avRoute.snapshot.url[0].path, 'url');
    if (avRoute.snapshot.url && avRoute.snapshot.url.length > 0) {
      this.url = avRoute.snapshot.url[0].path;
      this.headingTile = this.toTitleCase(avRoute.snapshot.url[0].path);
      this.title.setTitle(
        `${this.headingTile} - Movies`
      );
    }
  }

  ngOnInit(): void {
    this.selectTvShowToDisplay(this.url);
  }

  getPopularTvShows() {
    this.loadingTvShow = true;
    this._tvShowService
      .getTvShowPopular(this.page)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((data: any) => {
        console.log(data, 'tv show');
        this.tvShowList = data.results;
        this.pageLength = data.total_results;
        this.loadingTvShow = false;
      });
  }

  getOnAir() {
    this.loadingTvShow = true;
    this._tvShowService
      .getTvShowOnAir(this.page)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((data: any) => {
        this.tvShowList = data.results;
        this.pageLength = data.total_results;
        this.loadingTvShow = false;
      });
  }

  getAiringToday() {
    this.loadingTvShow = true;
    this._tvShowService
      .getTvShowAiringToday(this.page)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((data: any) => {
        this.tvShowList = data.results;
        this.pageLength = data.total_results;
        this.loadingTvShow = false;
      });
  }

  getTopRated() {
    this.loadingTvShow = true;
    this._tvShowService
      .getTvShowTopRated(this.page)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((data: any) => {
        this.tvShowList = data.results;
        this.pageLength = data.total_results;
        this.loadingTvShow = false;
      });
  }

  selectTvShowToDisplay(url: string) {
    switch (url) {
      case 'popular':
        this.getPopularTvShows();
        break;
      case 'on-air':
        this.getOnAir();
        break;
      case 'top-rated':
        this.getTopRated();
        break;
      case 'airing-today':
        this.getAiringToday();
        break;
      default:
        this.error();
        break;
    }
  }

  error() {
    console.log('error');
  }

  pageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.selectTvShowToDisplay(this.url);
  }

  openDialog(id: number) {
   const dialogRef = this.dialog.open(DetailsComponent, {
      data: { tvShowId: id },
      panelClass: 'custom-dialog-container',
    });

    // dialogRef.afterClosed().subscribe((result)=>{
    //   console.log(result, "result");
    //   this.title.setTitle(
    //     `${this.toTitleCase(this.url)} - Moviest`
    //   );
    // })
  }

  toTitleCase(url: string): string {
    let replacedString = url.replace('-', ' ');
    let transformedString = this.titleCase.transform(replacedString);
    return transformedString;
  }
}
