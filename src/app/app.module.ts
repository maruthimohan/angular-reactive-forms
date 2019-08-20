import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MaterialModule } from './material-module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import 'hammerjs';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroService } from './hero.service';

@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ HeroService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
