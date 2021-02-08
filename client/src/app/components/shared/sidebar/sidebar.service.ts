import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { IQuote } from '../../../../interfaces/quotes.interface';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  constructor(private httpClient: HttpClient) {}

  getQuotes(): Observable<IQuote[]> {
    return this.httpClient.get(`${environment.quoteApiUrl}`) as Observable<
      IQuote[]
    >;
  }
}
