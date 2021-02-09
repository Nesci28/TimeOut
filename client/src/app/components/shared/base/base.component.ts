import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  template: '',
})
export abstract class BaseComponent implements OnDestroy {
  private readonly destroySubject = new Subject();
  public readonly destroy$ = this.destroySubject.asObservable();

  constructor(public router: Router) {}

  public ngOnDestroy(): void {
    this.destroySubject.next();
  }

  redirectTo(uri: string, queryParams: { [key: string]: string }): void {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri], { queryParams }));
  }
}
