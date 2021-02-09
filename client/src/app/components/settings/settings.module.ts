import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SettingsGeneralComponent } from './settings-general/settings-general.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [SettingsGeneralComponent, SettingsComponent],
  imports: [CommonModule, SettingsRoutingModule, SharedModule],
})
export class SettingsModule {}
