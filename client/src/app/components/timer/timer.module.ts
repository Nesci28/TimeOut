import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TimerRoutingModule } from './timer-routing.module';
import { TimerComponent } from './timer.component';

@NgModule({
  declarations: [TimerComponent],
  imports: [CommonModule, TimerRoutingModule, SharedModule],
})
export class TimerModule {}
