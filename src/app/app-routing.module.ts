// import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser'
import { BiddingPageComponent } from './bidding-page/bidding-page.component';
import { OfferingPageComponent } from './offering-page/offering-page.component';
import { BuyingPageComponent } from './buying-page/buying-page.component';


const routes: Routes = [
  // Define your routes here
  {path:'bidding-page', component:BiddingPageComponent},
  {path:'offering-page', component:OfferingPageComponent},
  {path:'buying-page', component:BuyingPageComponent}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
 

}