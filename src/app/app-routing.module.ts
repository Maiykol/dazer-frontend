import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoPageFoundComponentComponent } from './no-page-found-component/no-page-found-component.component';
import { SubsamplingComponent } from './subsampling/subsampling.component';
import { SubsamplingResultComponent } from './subsampling-result/subsampling-result.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/subsampling', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'subsampling', component: SubsamplingComponent },
  { path: 'subsampling/:subsampling', component: SubsamplingResultComponent },
  { path: '**', component: NoPageFoundComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
