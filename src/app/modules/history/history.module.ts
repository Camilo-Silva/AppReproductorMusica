import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { SearchComponent } from './components/search/search.component';
import { PlayListBodyComponent } from '@shared/components/play-list-body/play-list-body.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    HistoryPageComponent,
    SearchComponent,
    PlayListBodyComponent
    
  ]
})
export class HistoryModule { }
