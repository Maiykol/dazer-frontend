import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SubsamplingComponent } from './subsampling/subsampling.component';
import { NoPageFoundComponentComponent } from './no-page-found-component/no-page-found-component.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { SubsamplingModalComponent } from './subsampling-modal/subsampling-modal.component';
import { SubsamplingResultComponent } from './subsampling-result/subsampling-result.component';
import { ClassificationModalComponent } from './classification-modal/classification-modal.component';
import { ClassificationResultComponent } from './classification-result/classification-result.component';
import { ClassificationSurvivalComponent } from './classification-survival/classification-survival.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SubsamplingComponent,
    NoPageFoundComponentComponent,
    NavbarComponent,
    FooterComponent,
    SubsamplingModalComponent,
    SubsamplingResultComponent,
    ClassificationModalComponent,
    ClassificationResultComponent,
    ClassificationSurvivalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
