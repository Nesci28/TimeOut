import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IImageApi } from '../../../interfaces/images.interface';
import { IQuoteApi } from '../../../interfaces/quotes.interface';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor(private httpClient: HttpClient) {}

  getQuotes(category: string): Observable<IQuoteApi> {
    const params = {
      params: new HttpParams({ fromString: `category=${category}` }),
    };
    return this.httpClient.get(
      `${environment.quoteApiUrl}/qod`,
      params
    ) as Observable<IQuoteApi>;
  }

  getImage(): Observable<IImageApi> {
    const params = {
      params: new HttpParams({
        fromString: `client_id=${environment.unsplashKey}`,
      }),
    };
    return this.httpClient.get(
      `${environment.unsplashApiUrl}/photos/random`,
      params
    ) as Observable<IImageApi>;
  }
}
