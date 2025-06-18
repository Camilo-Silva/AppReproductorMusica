import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TrackModel } from '@core/models/tracks.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private readonly URL = environment.api;
  
  constructor(private httpClient: HttpClient) { 
    // Initialize any necessary properties or services here
    
    
  }

  getAllTracks(): Observable<TrackModel[]> {
    return this.httpClient.get<TrackModel[]>(`${this.URL}/tracks`);
  }
}
