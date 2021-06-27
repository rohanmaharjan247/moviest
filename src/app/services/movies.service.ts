import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { pipe, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(
    @Inject('BASE_API_URL') public baseUrl: string,
    private httpClient: HttpClient
  ) {}

  getLatestMovies(page: number) {
    return this.httpClient
      .get(`${this.baseUrl}/movie/latest`, {
        params: new HttpParams().set('page', String(page)),
      })
      .pipe(catchError(this.handleErrors));
  }

  getNowPlayingMovies(page: number) {
    return this.httpClient
      .get(`${this.baseUrl}/movie/now_playing`, {
        params: new HttpParams().set('page', String(page)),
      })
      .pipe(catchError(this.handleErrors));
  }
  getPopularMovies(page: number) {
    return this.httpClient
      .get(`${this.baseUrl}/movie/popular`, {
        params: new HttpParams().set('page', String(page)),
      })
      .pipe(catchError(this.handleErrors));
  }
  getTopRatedMovies(page: number) {
    return this.httpClient
      .get(`${this.baseUrl}/movie/top_rated`, {
        params: new HttpParams().set('page', String(page)),
      })
      .pipe(catchError(this.handleErrors));
  }
  getUpcomingMovies(page: number) {
    return this.httpClient
      .get(`${this.baseUrl}/movie/upcoming`, {
        params: new HttpParams().set('page', String(page)),
      })
      .pipe(catchError(this.handleErrors));
  }
  getMovieDetail(movieId: number) {
    return this.httpClient
      .get(`${this.baseUrl}/movie/${movieId}`)
      .pipe(catchError(this.handleErrors));
  }

  getMovieCredits(movieId: number) {
    return this.httpClient
      .get(`${this.baseUrl}/movie/${movieId}/credits`)
      .pipe(catchError(this.handleErrors));
  }

  getKeywords(movieId: number) {
    return this.httpClient
      .get(`${this.baseUrl}/movie/${movieId}/keywords`)
      .pipe(catchError(this.handleErrors));
  }

  getReviews(movieId: number) {
    return this.httpClient
      .get(`${this.baseUrl}/movie/${movieId}/reviews`)
      .pipe(catchError(this.handleErrors));
  }

  getMovieVideos(movieId: number) {
    return this.httpClient
      .get(`${this.baseUrl}/movie/${movieId}/videos`)
      .pipe(catchError(this.handleErrors));
  }

  private handleErrors(error: HttpErrorResponse) {
    if (error.status === 0) {
      //A client side or network error occured. Handle it correctly
      console.error('An error occured', error.error);
    } else {
      console.error(
        `Backend returned error ${error.status}, body was: ${error.error}`
      );
    }

    return throwError(`Something bad happened; Please try again later`);
  }
}
