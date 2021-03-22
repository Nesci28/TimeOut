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
import { ITimer } from '../../../../interfaces/timers.interface';
import { BaseComponent } from '../base/base.component';

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

  constructor(electronService: ElectronService, router: Router) {
    super(router, electronService);
  }

  async ngOnInit(): Promise<void> {
    this.timers.forEach((t, i) => {
      t.interval = setInterval(() => {
        this.updateRemaining(i);
      }, 1000);
    });
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
      this.openOverlay(this.timers[index].config);
      this.timers[index].remaining = this.timers[index].config;
    }
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

  openOverlay(ms: number): void {
    this.renderer.send('openOverlays', { ms });
    setTimeout(() => {
      this.renderer.send('closeOverlays');
    }, ms);
  }
}
