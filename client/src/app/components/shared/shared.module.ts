import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { InputTrimModule } from 'ng2-trim-directive';
import { NgxMaskModule } from 'ngx-mask';

import { MaterialModule } from '../../material.module';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule,
    NgxMaskModule,
    InputTrimModule,
  ],
  exports: [
    SidebarComponent,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule,
    MaterialModule,
    NgxMaskModule,
    InputTrimModule,
  ],
})
export class SharedModule {}
