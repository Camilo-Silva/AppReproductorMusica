import { Component, OnInit } from '@angular/core';
import { SectionGenericComponent } from "../../../../shared/components/section-generic/section-generic.component";
import * as dataRaw from '../../../../data/tracks.json';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-tracks-page',
  standalone: true,
  imports: [SectionGenericComponent],
  templateUrl: './tracks-page.component.html',
  styleUrl: './tracks-page.component.css'
})
export class TracksPageComponent implements OnInit {
  mockTracksList: Array<TrackModel> = [
   
  ];

  ngOnInit(): void {
    const {data}:any = (dataRaw as any).default;
    this.mockTracksList = data;
  }
}