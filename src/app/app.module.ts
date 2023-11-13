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
import { FormsModule } from '@angular/forms';
import { SubsamplingResultPlotsComponent } from './subsampling-result-plots/subsampling-result-plots.component';
import { ButtonShareComponent } from './button-share/button-share.component';
import { SubsamplingResultParametersComponent } from './subsampling-result-parameters/subsampling-result-parameters.component';
import { ClassificationResultParametersComponent } from './classification-result-parameters/classification-result-parameters.component';
import { FileMenuComponent } from './file-menu/file-menu.component';
import { ButtonDeleteComponent } from './button-delete/button-delete.component';
import { ButtonShowComponent } from './button-show/button-show.component';
import { FileMenuFlyoutComponent } from './file-menu-flyout/file-menu-flyout.component';
import { ButtonNewSubsampleComponent } from './button-new-subsample/button-new-subsample.component';


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
    ClassificationSurvivalComponent,
    SubsamplingResultPlotsComponent,
    ButtonShareComponent,
    SubsamplingResultParametersComponent,
    ClassificationResultParametersComponent,
    FileMenuComponent,
    ButtonDeleteComponent,
    ButtonShowComponent,
    FileMenuFlyoutComponent,
    ButtonNewSubsampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
