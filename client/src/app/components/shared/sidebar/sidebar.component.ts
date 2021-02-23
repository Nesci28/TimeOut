import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBullseye,
  faCogs,
  faMugHot,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { ElectronService } from 'ngx-electron';

import { Menu } from '../../../../interfaces/menu.interface';
import { IQuote } from '../../../../interfaces/quotes.interface';
import { ITimer } from '../../../../interfaces/timers.interface';
import { BaseComponent } from '../base/base.component';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent
  extends BaseComponent
  implements OnInit, OnDestroy {
  icons: IconDefinition[] = [faMugHot, faBullseye, faCogs];

  menus: Menu[] = [
    {
      name: 'General',
      routing: 'general',
    },
  ];

  // TODO: Change timer for the real saved value in localStorage
  timers: ITimer[] = [
    {
      interval: undefined,
      timer: 1000 * 60 * 60,
      remaining: 1000 * 60 * 60,
      config: Number(localStorage.getItem('btConfig')) || 1000 * 60 * 60,
    },
    {
      interval: undefined,
      timer: 1000 * 60 * 30,
      remaining: 1000 * 60 * 30,
      config: Number(localStorage.getItem('stConfig')) || 1000 * 60 * 30,
    },
  ];
  quotes: IQuote[] = [];

  constructor(
    private sidebarService: SidebarService,
    electronService: ElectronService,
    router: Router
  ) {
    super(router, electronService);
  }

  async ngOnInit(): Promise<void> {
    this.timers.forEach((t, i) => {
      t.interval = setInterval(() => {
        this.updateRemaining(i);
      }, 1000);
    });
    this.quotes = await this.getQuotes();
  }

  ngOnDestroy(): void {
    clearInterval(this.timers[0].interval);
    clearInterval(this.timers[1].interval);
  }

  updateRemaining(index: number): void {
    this.timers[index].remaining -= 1000;
    const timerType = index === 0 ? 'normal' : 'micro';
    this.renderer.send('setTraysText', {
      timerType,
      remaining: this.timers[index].remaining,
    });
    if (this.timers[index].remaining === 0) {
      this.takeBreak();
      this.timers[index].remaining = this.timers[index].config;
    }
  }

  async getQuotes(): Promise<IQuote[]> {
    return this.sidebarService.getQuotes().toPromise();
  }

  async takeBreak(): Promise<void> {
    const quote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    console.log('quote :>> ', quote);
  }

  redirect(url: string, queryParams: { [key: string]: string }): void {
    this.redirectTo(url, queryParams);
  }

  restart(index: number): void {
    clearInterval(this.timers[index].interval);
    this.timers[index].remaining = this.timers[index].timer;
    this.timers[index].interval = setInterval(() => {
      this.updateRemaining(index);
    }, 1000);
  }

  openOverlay(): void {
    this.renderer.send('openOverlays');
  }
}
