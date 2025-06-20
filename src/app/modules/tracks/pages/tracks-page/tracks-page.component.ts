import { Component, OnDestroy, OnInit } from '@angular/core';
import { SectionGenericComponent } from "../../../../shared/components/section-generic/section-generic.component";

import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { firstValueFrom, Subscription } from 'rxjs';


@Component({
  selector: 'app-tracks-page',
  standalone: true,
  imports: [SectionGenericComponent],
  templateUrl: './tracks-page.component.html',
  styleUrl: './tracks-page.component.css'
})
export class TracksPageComponent implements OnInit, OnDestroy {
  tracksTrending: Array<TrackModel> = [];
  tracksRandom: Array<TrackModel> = [];

  listObservers$: Array<Subscription> = [];

  constructor(private trackService: TrackService) {
    
   
  }

  ngOnInit(): void {
    this.loadDataAll();
    this.loadDataRandom();
  }

  async loadDataAll(): Promise<any> {
    // this.tracksTrending = await this.trackService.getAllTracks$().toPromise()//forma deprecada
    this.tracksTrending = await firstValueFrom(this.trackService.getAllTracks$());//Forma recomendada
    // console.log('Datos de todas las canciones', dataRaw);
  }

  loadDataRandom(): void {
    this.trackService.getAllRandom$().subscribe({
      next: (response: TrackModel[]) => {
        this.tracksRandom = response;}
      // },
      // error: (err) => {
      //   console.log('Error al cargar las canciones aleatorias');
      // }
    });
  }

  ngOnDestroy(): void {
    
  }

}