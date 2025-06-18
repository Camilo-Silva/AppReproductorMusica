import { Component, OnDestroy, OnInit } from '@angular/core';
import { SectionGenericComponent } from "../../../../shared/components/section-generic/section-generic.component";

import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { response } from 'express';
import { Observable, Subscription } from 'rxjs';

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
    this.trackService.getAllTracks().subscribe((response: TrackModel[]) => {
      this.tracksTrending = response;
    }); 
  }

  ngOnDestroy(): void {
    
    
  }
}