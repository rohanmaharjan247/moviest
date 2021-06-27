import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(
    @Inject('BASE_API_URL') public baseUrl: string,
    private httpClient: HttpClient
  ) {}

  searchPeople(query: string) {
    return this.httpClient
      .get(`${this.baseUrl}/search/person`, {
        params: new HttpParams().set('query', query),
        observe: 'events',
        reportProgress: true
      })
      .pipe(catchError(this.handleErrors));
  }

  searchTVShow(query: string) {
    return this.httpClient
      .get(`${this.baseUrl}/search/tv`, {
        params: new HttpParams().set('query', query),
        // observe: 'events',
        // reportProgress: true
      })
      .pipe(catchError(this.handleErrors));
  }

  searchMovie(query: string) {
    return this.httpClient
      .get(`${this.baseUrl}/search/movie`, {
        params: new HttpParams().set('query', query),
        // observe: 'events',
        // reportProgress: true
      })
      .pipe(catchError(this.handleErrors));
  }

  private handleErrors(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occured', error.error);
    } else {
      console.error(
        `Backend error occured with status ${error.status}, body was ${error.error}`
      );
    }

    return throwError('Something bad happened! Please try again later');
  }
}
