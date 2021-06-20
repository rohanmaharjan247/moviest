import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-celeb-detail',
  templateUrl: './celeb-detail.component.html',
  styleUrls: ['./celeb-detail.component.scss'],
})
export class CelebDetailComponent implements OnInit, OnDestroy {
  private toUnsubscribe$ = new Subject<void>();

  peopleId = 0;

  celebDetail: any;

  socialIds: any;
  combinedCredits: any;

  fewCredits: any;

  loadingCelebs =false;

  constructor(
    private avRoute: ActivatedRoute,
    private _peopleService: PeopleService,
    public _configurationService: ConfigurationService,
    private title: Title
  ) {
    this.avRoute.params.subscribe((params) => {
      this.peopleId = +params.id;
    });
  }
  ngOnDestroy(): void {
    this.toUnsubscribe$.next();
    this.toUnsubscribe$.complete();
  }

  ngOnInit(): void {
    this.getCelebDetail();
    this.getExternalId();
    this.getCombinedCredit();
  }

  getCelebDetail() {
    this.loadingCelebs = true;
    this._peopleService
      .getPeopleDetail(this.peopleId)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((data: HttpEvent<any>) => {
        console.log(data, 'celeb');
        if (data.type === HttpEventType.Response) {
          this.celebDetail = data.body;
          this.title.setTitle(`${data.body.name} - Moviest`);
          this.loadingCelebs = false;
        }
      });
  }

  getExternalId() {
    this._peopleService
      .getExternalIds(this.peopleId)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((data: any) => {
        console.log(data, 'external');
        this.socialIds = data;
      });
  }

  getCombinedCredit() {
    this._peopleService
      .getCombinedCredits(this.peopleId)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((data: any) => {
        console.log('combined credit', data);
        this.combinedCredits = data;
        this.fewCredits = data.cast.sort((a: any, b: any) => {
          return b.popularity - a.popularity;
        }).slice(0, 5);
      });
  }

  calculateDate(birthDay: string) {
    let birthYear = new Date(birthDay).getFullYear();
    let currentAge = new Date().getFullYear() - birthYear - 1;

    return currentAge;
  }
}
