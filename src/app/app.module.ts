import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DragDropModule } from 'primeng/dragdrop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EmailBuilderModule } from './pages/email-builder/email-builder.module';
import { CompBComponent } from './comp-b/comp-b.component';


@NgModule({
  declarations: [
    AppComponent,
    CompBComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    EmailBuilderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
