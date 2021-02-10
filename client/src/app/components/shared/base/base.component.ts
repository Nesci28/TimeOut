import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IpcRenderer } from 'electron';
import { Subject } from 'rxjs';
import { ElectronService } from 'ngx-electron';

@Component({
  template: '',
})
export abstract class BaseComponent implements OnDestroy {
  private readonly destroySubject = new Subject();
  public readonly destroy$ = this.destroySubject.asObservable();

  public readonly renderer: IpcRenderer;

  constructor(public router: Router, public electronService: ElectronService) {
    this.renderer = this.electronService.ipcRenderer;
  }

  public ngOnDestroy(): void {
    this.destroySubject.next();
  }

  redirectTo(uri: string, queryParams: { [key: string]: string }): void {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri], { queryParams }));
  }
}
