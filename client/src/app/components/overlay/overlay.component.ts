import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';

import { BaseComponent } from '../shared/base/base.component';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent extends BaseComponent {
  constructor(router: Router, electronService: ElectronService) {
    super(router, electronService);
  }
  skip(): void {
    this.renderer.send('closeOverlays');
  }

  postpone(minute: number): void {
    this.renderer.send('postponeOverlays', minute);
  }
}
