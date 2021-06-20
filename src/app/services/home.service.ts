import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(
    @Inject('BASE_API_URL') public baseUrl: string,
    private httpClient: HttpClient
  ) {}

  getTrending(mediaType: string, timeWindow: 'day' | 'week') {
    return this.httpClient
      .get(`${this.baseUrl}/trending/${mediaType}/${timeWindow}`)
      .pipe(catchError(this.handleErrors));
  }

  searchAll(query:string){
    return this.httpClient.get(`${this.baseUrl}/search/multi`, {
      params: new HttpParams().set('query', query)
    }).pipe(catchError(this.handleErrors));
  }

  private handleErrors(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occured', error.error);
    } else {
      console.error(
        `Backend error with status: ${error.status}, body was:`,
        error.error
      );
    }

    return throwError('Something bad happened! Please try again later');
  }
}
