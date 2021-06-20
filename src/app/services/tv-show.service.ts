import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TvShowService {
  constructor(
    @Inject('BASE_API_URL') public baseUrl: string,
    private httpClient: HttpClient
  ) {}

  getTvShowPopular(page: number) {
    return this.httpClient
      .get(`${this.baseUrl}/tv/popular`, {
        params: new HttpParams().set('page', String(page)),
      })
      .pipe(catchError(this.handleErrors));
  }

  getTvShowTopRated(page: number) {
    return this.httpClient
      .get(`${this.baseUrl}/tv/top_rated`, {
        params: new HttpParams().set('page', String(page)),
      })
      .pipe(catchError(this.handleErrors));
  }

  getTvShowAiringToday(page: number) {
    return this.httpClient
      .get(`${this.baseUrl}/tv/airing_today`, {
        params: new HttpParams().set('page', String(page)),
      })
      .pipe(catchError(this.handleErrors));
  }

  getTvShowOnAir(page: number) {
    return this.httpClient
      .get(`${this.baseUrl}/tv/on_the_air`, {
        params: new HttpParams().set('page', String(page)),
      })
      .pipe(catchError(this.handleErrors));
  }

  getTvShowDetail(id: number) {
    return this.httpClient
      .get(`${this.baseUrl}/tv/${id}`)
      .pipe(catchError(this.handleErrors));
  }

  getTvShowCredits(id:number){
    return this.httpClient
      .get(`${this.baseUrl}/tv/${id}/credits`)
      .pipe(catchError(this.handleErrors));
  }

  getTvShowreviews(id:number){
    return this.httpClient
    .get(`${this.baseUrl}/tv/${id}/reviews`)
    .pipe(catchError(this.handleErrors));
  }

  getTvShowKeywords(id:number){
    return this.httpClient
    .get(`${this.baseUrl}/tv/${id}/keywords`)
    .pipe(catchError(this.handleErrors));
  }

  handleErrors(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error Occured', error.error);
    } else {
      console.error(
        `A backend error occured ${error.status}, body was`,
        error.error
      );
    }

    return throwError('A problem occured! Please try again later');
  }
}
