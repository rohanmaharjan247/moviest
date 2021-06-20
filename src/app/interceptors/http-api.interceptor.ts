import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
  HttpEventType,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpApiInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let requestWithAPIkey = request
      .clone({
        params: request.params.set('api_key', '63e4053510d280ead658f333d4c1948a')
      })
      if(request.reportProgress){
        return next.handle(requestWithAPIkey).pipe(tap((event:HttpEvent<any>) => {
          if(event.type === HttpEventType.DownloadProgress){
            console.log(event);
            console.log(Math.round(event.loaded / (event.total ?? 0) * 100))
          }
        }))
      }
      else{
        return next.handle(requestWithAPIkey);
      }

  }
}
