import {
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, take, takeUntil, takeWhile } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  private toUnsubscribe$ = new Subject();

  movieId = 0;

  movieDetail: any;
  movieCredits: any;
  movieKeywords: any;
  movieReviews: any;
  allMovieCredits: any;
  movieVideos:any;
  viewMore = false;
  sanitizerUrl:any;

  @ViewChild('allMovieCreditsDialog') allCreditsDialog!: TemplateRef<any>;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) data: { movieId: number },
    private _movieService: MoviesService,
    public _configuration: ConfigurationService,
    private avRouter: ActivatedRoute,
    private title: Title,
    private dialog: MatDialog,
    private router: Router,
    private domSanitizer: DomSanitizer
  ) {
    if (data) {
      this.movieId = data.movieId;
      this.viewMore = false;
    } else {
      avRouter.params.subscribe((data) => {
        this.movieId = +data['id'];
        this.viewMore = true;
      });
    }
  }
  ngOnDestroy(): void {
    this.toUnsubscribe$.next();
    this.toUnsubscribe$.complete();
  }

  ngOnInit(): void {
    this.getMovieDetail();
    this.getMovieCredits();
    this.getMovieKeyword();
    this.getMovieReviews();
    this.getMovieVideos();
  }

  getMovieDetail() {
    this._movieService
      .getMovieDetail(this.movieId)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((data: any) => {
        this.movieDetail = data;
        if (this.viewMore) {
          this.title.setTitle(`${data.title} - Moviest`);
        }
      });
  }

  getMovieCredits() {
    this._movieService
      .getMovieCredits(this.movieId)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((data: any) => {
        console.log('credits', data);
        this.movieCredits = data.cast
          .filter((x: any) => x.known_for_department.toLowerCase() === 'acting')
          .slice(0, 5);
        this.allMovieCredits = data;
      });
  }

  getMovieKeyword() {
    this._movieService
      .getKeywords(this.movieId)
      .pipe(
        map((m: any) => {
          return m.keywords;
        }),
        takeUntil(this.toUnsubscribe$)
      )
      .subscribe((data: any) => {
        this.movieKeywords = data;
      });
  }

  getMovieReviews() {
    this._movieService
      .getReviews(this.movieId)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((data: any) => {
        this.movieReviews = data;
      });
  }

  getMovieVideos() {
    this._movieService
      .getMovieVideos(this.movieId)
      .pipe(takeUntil(this.toUnsubscribe$))
      .subscribe((data: any) => {
        console.log(data, "movie videos");
        this.movieVideos = data;
      });
  }

  openDialog() {
    this.dialog.open(this.allCreditsDialog);
  }

  closeDialog(id: number) {
    this.router.navigate(['/people', id]);
    this.dialog.closeAll();
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

  convertRuntime(runtimeSeconds: number) {
    let minutes = Math.floor(runtimeSeconds % 60);
    let hours = Math.floor(runtimeSeconds / 60);

    return `${hours}h ${minutes}m`;
  }
}
