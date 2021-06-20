import { TitleCasePipe } from '@angular/common';
import { Component, Inject, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { TvShowService } from 'src/app/services/tv-show.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  private _toUnsubscribe$ = new Subject<void>();

  tvShowDetail: any;
  tvShowCredits: any;
  tvShowKeywords: any;
  tvShowReviews: any;
  alltvShowCredits: any;
  viewMore = false;

  tvShowId = 0;

  @ViewChild('allSeasons') allSeason!: TemplateRef<any>;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { tvShowId: number },
    public _configuration: ConfigurationService,
    private _tvShowService: TvShowService,
    private avRoute: ActivatedRoute,
    private title: Title,
    private dialog: MatDialog
  ) {
    if (data) {
      this.tvShowId = this.data.tvShowId;
      this.viewMore = false;
    } else {
      if (avRoute.snapshot.paramMap.has('id')) {
        avRoute.params.subscribe((param) => {
          this.tvShowId = +param.id;
          this.viewMore = true;
        });
      }
    }
  }

  ngOnInit(): void {
    this.getTvShowDetail();
    this.getTvShowCredits();
    this.getTvShowKeywords();
    this.getTvShowReviews();
  }

  getTvShowDetail() {
    this._tvShowService
      .getTvShowDetail(this.tvShowId)
      .pipe(takeUntil(this._toUnsubscribe$))
      .subscribe((data: any) => {
        console.log(data, 'tvshow data');
        this.tvShowDetail = data;
        if (this.viewMore) this.title.setTitle(`${data.name} - Moviest`);
      });
  }

  getTvShowCredits() {
    this._tvShowService
      .getTvShowCredits(this.tvShowId)
      .pipe(takeUntil(this._toUnsubscribe$))
      .subscribe((data: any) => {
        this.tvShowCredits = data.cast
          .filter((x: any) => x.known_for_department.toLowerCase() === 'acting')
          .slice(0, 5);
        this.alltvShowCredits = data;
      });
  }

  getTvShowReviews() {
    this._tvShowService
      .getTvShowreviews(this.tvShowId)
      .pipe(takeUntil(this._toUnsubscribe$))
      .subscribe((data: any) => {
        this.tvShowReviews = data;
      });
  }

  getTvShowKeywords() {
    this._tvShowService
      .getTvShowKeywords(this.tvShowId)
      .pipe(takeUntil(this._toUnsubscribe$))
      .subscribe((data: any) => {
        console.log(data, 'tv show keywords');
        this.tvShowKeywords = data.results;
      });
  }

  openDialog(choice?:string) {
    if(choice && choice === 'season'){
      if(this.allSeason){
        const dialogRef = this.dialog.open(this.allSeason, {
          panelClass: 'custom-dialog-container',
        });
      }
    }
    else{

    }
  }

  closeDialog(id: number) {}

  convertRuntime(runtimeSeconds: number) {
    let minutes = Math.floor(runtimeSeconds % 60);
    let hours = Math.floor(runtimeSeconds / 60);

    return `${hours > 0 ? hours + 'h' + { minutes } + 'm' : minutes + 'm'}`;
  }

  pcInitials(pcName: string) {
    let parts = [];
    if (pcName.includes('-')) {
      parts = pcName.split('-');
    } else {
      parts = pcName.split(' ');
    }

    let initials = '';
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].length > 0 && parts[i] !== '') {
        initials += parts[i][0];
      }
    }
    return initials;
  }
}
