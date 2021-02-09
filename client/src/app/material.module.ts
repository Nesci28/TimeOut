import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatButtonModule, MatCheckboxModule, MatInputModule],
  exports: [MatButtonModule, MatCheckboxModule, MatInputModule],
})
export class MaterialModule {}
