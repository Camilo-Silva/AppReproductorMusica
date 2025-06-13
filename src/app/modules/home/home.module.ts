import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    HomePageComponent,
    SharedModule
  ]
})
export class HomeModule { }
