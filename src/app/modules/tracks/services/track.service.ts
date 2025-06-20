import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, Observable, of, tap } from 'rxjs';
import { TrackModel } from '@core/models/tracks.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { stat } from 'fs';


@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private readonly URL = environment.api;

  constructor(private http: HttpClient) { }

  private skipById(listTracks: TrackModel[], id: number): Promise<TrackModel[]> {
    return new Promise((resolve) => {
      const listTmp = listTracks.filter((track) => track._id !== id);
      resolve(listTmp);
    });
  }
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
      // map(({data}: any) => { //TODO: Devolvemos lista de canciones revertida
      //   return [...data].reverse();
      // }),
      // -----------------------
      //  map((dataRevertida) => { //TODO: Aplicar un filter comun de array
      //   return dataRevertida.filter((track: TrackModel) => track._id !== 1);
      // })
      tap((data) => {
        console.log('Antes de filtrar', data);
      }),
      mergeMap(({data}: any) => this.skipById(data, 1)),//TODO: Aplicar un filter comun de array
      tap((data) => {
        console.log('Después de filtrar', data);
      }),
      catchError((error) => {
        console.log('Error al cargar las canciones aleatorias', error.message);
        return of([]);
      })
    );
  }
}
