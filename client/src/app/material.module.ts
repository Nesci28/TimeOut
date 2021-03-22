import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatProgressBarModule],
  exports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatProgressBarModule],
})
export class MaterialModule {}
