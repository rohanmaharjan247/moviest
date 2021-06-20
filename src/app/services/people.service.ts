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
export class PeopleService {
  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_API_URL') public baseUrl: string
  ) {}

  getPopularPeople(page: number) {
    return this.httpClient
      .get(`${this.baseUrl}/person/popular`, {
        params: new HttpParams().set('page', String(page)),
        observe: 'events',
        reportProgress: true,
      })
      .pipe(catchError(this.handleErrors));
  }

  getPeopleDetail(peopleId: number) {
    return this.httpClient
      .get(`${this.baseUrl}/person/${peopleId}`, {
        observe: 'events',
        reportProgress: true,
      })
      .pipe(catchError(this.handleErrors));
  }

  getCombinedCredits(peopleId: number) {
    return this.httpClient
      .get(`${this.baseUrl}/person/${peopleId}/combined_credits`)
      .pipe(catchError(this.handleErrors));
  }

  getExternalIds(peopleId: number) {
    return this.httpClient
      .get(`${this.baseUrl}/person/${peopleId}/external_ids`)
      .pipe(catchError(this.handleErrors));
  }

  private handleErrors(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occured.', error.error);
    } else {
      console.error(
        `Backend threw an error of ${error.status}, body was ${error.error}`
      );
    }

    return throwError('Something bad happened! Please try again later');
  }
}
