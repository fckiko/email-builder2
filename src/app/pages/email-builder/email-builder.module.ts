import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailBuilderComponent } from './email-builder.component';
import { DragDropModule } from 'primeng/dragdrop';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmailBuilderComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule
  ],
  exports: [
    EmailBuilderComponent
  ]
})
export class EmailBuilderModule { }
