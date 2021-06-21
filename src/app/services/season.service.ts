import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SeasonService {
  constructor(
    @Inject('BASE_API_URL') public baseUrl: string,
    private httpClient: HttpClient
  ) {}

  getSeasonDetail(tvId: number, seasonNo: number) {
    return this.httpClient
      .get(`${this.baseUrl}/tv/${tvId}/season/${seasonNo}`)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occured', error);
    } else {
      console.error(
        `A backend error occured with status: ${error.status}, body was`,
        error
      );
    }

    return throwError('A problem occured! Please try again');
  }
}
