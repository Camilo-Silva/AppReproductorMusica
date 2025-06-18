import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TracksRoutingModule } from './tracks-routing.module';
import { SharedModule } from '@shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TracksRoutingModule,
    SharedModule,
    HttpClientModule
  ]
})
export class TracksModule { }
