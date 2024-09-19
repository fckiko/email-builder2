import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailBuilderComponent } from './email-builder.component';
import { DragDropModule } from 'primeng/dragdrop';


@NgModule({
  declarations: [
    EmailBuilderComponent
  ],
  imports: [
    CommonModule,
    DragDropModule
  ],
  exports: [
    EmailBuilderComponent
  ]
})
export class EmailBuilderModule { }
