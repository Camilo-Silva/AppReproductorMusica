import { Component } from '@angular/core';
import { SearchComponent } from "../../components/search/search.component";
import { PlayListBodyComponent } from "../../../../shared/components/play-list-body/play-list-body.component";
import { SearchService } from '@modules/history/services/search.service';
import { TrackModel } from '@core/models/tracks.model';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [SearchComponent, PlayListBodyComponent, HttpClientModule, CommonModule],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css'
})
export class HistoryPageComponent {  
  listResults$: Observable<any> = of([]);
  constructor(private readonly searchService: SearchService) { }

  receiveData(event: string): void {    
    console.log('Datos recibidos en EL PADRE JUA JUA', event);
    this.listResults$ = this.searchService.searchTracks$(event);
  }       

};

