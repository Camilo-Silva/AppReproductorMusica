import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { TrackModel } from '@core/models/tracks.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private readonly URL = environment.api;

  constructor(private http: HttpClient) { }


  getAllTracks$(): Observable<any> {
    return this.http.get(`${this.URL}/tracks`)
    .pipe(
      map(({data}:any) => {
        return data
      })
    );
  }

  /**
   * @returns Devolver canciones aleatorias
   */
  getAllRandom$(): Observable<any> {
    return this.http.get(`${this.URL}/tracks`)
    .pipe(
      map(({data}: any) => {
        return [...data].reverse();
      })
    );
  }
}
