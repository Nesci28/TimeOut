import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseComponent } from '../shared/base/base.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent extends BaseComponent implements OnInit {
  id!: string;

  constructor(private route: ActivatedRoute, router: Router) {
    super(router);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams.id;
    console.log('this.id :>> ', this.id);
  }
}
