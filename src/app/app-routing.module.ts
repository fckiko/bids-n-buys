// import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser'
import { BiddingPageComponent } from './bidding-page/bidding-page.component';


const routes: Routes = [
  // Define your routes here
  {path:'bidding-page', component:BiddingPageComponent}
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