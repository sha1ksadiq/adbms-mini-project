import { Injectable } from '@angular/core';

import { catchError, Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseUrl';
import { ProcessHttpMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class StreamingService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHttpMsgService) { }

  getMovies(req: any): Observable<any> {
    return this.http.get(baseURL + 'movies/getMovies', req)
    .pipe(catchError(this.processHTTPMsgService.handleError))
  }

  getTvShows(req: any): Observable<any> {
    return this.http.get(baseURL + 'tv/getTvShows', req)
    .pipe(catchError(this.processHTTPMsgService.handleError))
  }
}
