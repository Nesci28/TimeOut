import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faBullseye,
  faCogs,
  faMugHot,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import { Menu } from '../../../../interfaces/menu.interface';
import { IQuote } from '../../../../interfaces/quotes.interface';
import { ITimer } from '../../../../interfaces/timers.interface';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  icons: IconDefinition[] = [faMugHot, faBullseye, faCogs];

  menus: Menu[] = [
    {
      name: 'General',
      routing: 'general',
    },
  ];

  timers: ITimer[] = [
    {
      interval: 0,
      remaining: 1000 * 60 * 60,
      config: Number(localStorage.getItem('btConfig')) || 1000 * 60 * 60,
    },
    {
      interval: 0,
      remaining: 1000 * 60 * 30,
      config: Number(localStorage.getItem('stConfig')) || 1000 * 60 * 30,
    },
  ];
  quotes: IQuote[] = [];

  constructor(private sidebarService: SidebarService) {}

  async ngOnInit(): Promise<void> {
    setInterval(() => {
      this.timers.forEach((_, i) => this.updateRemaining(i));
    }, 1000);
    this.quotes = await this.getQuotes();
  }

  ngOnDestroy(): void {
    clearInterval(this.timers[0].interval);
    clearInterval(this.timers[1].interval);
  }

  updateRemaining(index: number): void {
    this.timers[index].remaining -= 1000;
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
}
