import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';

import { BaseComponent } from '../shared/base/base.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent extends BaseComponent implements OnInit {
  id!: string;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    electronService: ElectronService
  ) {
    super(router, electronService);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams.id;
  }
}
