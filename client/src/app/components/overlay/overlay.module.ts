import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { OverlayRoutingModule } from './overlay-routing.module';
import { OverlayComponent } from './overlay.component';

@NgModule({
  declarations: [OverlayComponent],
  imports: [CommonModule, OverlayRoutingModule, SharedModule],
})
export class OverlayModule {}
