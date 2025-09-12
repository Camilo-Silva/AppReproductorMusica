import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, Observable, of, tap } from 'rxjs';
import { TrackModel } from '@core/models/tracks.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



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
      map(({data}: any) => {
        console.log('Datos recibidos de la API:', data);
        return data.map((track: any) => {
          // Si la URL ya viene completa (con http), no agregar prefijo
          const audioUrl = track.url.startsWith('http') 
            ? track.url 
            : `${this.URL}/audio/${track.url}`;  // Cambiar a /audio/ según netlify.toml
          console.log('URL original:', track.url);
          console.log('URL final generada:', audioUrl);
          return {
            ...track,
            url: audioUrl
          };
        });
      })
    );
  }
  // getAllTracks$(): Observable<any> {
  //   return this.http.get(`${this.URL}/tracks`)
  //     .pipe(
  //       map(({ data }: any) => {
  //         return data.map((track: any) => ({
  //           ...track,
  //           url: `https://api-reproductormusica-production.up.railway.app/${track.url}`
  //         }));
  //       })
  //     )
  // }

  /**
   * @returns Devolver canciones aleatorias
   */
  getAllRandom$(): Observable<any> {
    return this.http.get(`${this.URL}/tracks`)
      .pipe(
        tap((data) => {
          console.log('Antes de filtrar', data);
        }),
        mergeMap(({data}: any) => this.skipById(data, 1)),
        map((tracks: any[]) =>
          tracks.map((track: any) => ({
            ...track,
            url: track.url.startsWith('http') 
              ? track.url 
              : `${this.URL}/audio/${track.url}`  // Cambiar a /audio/ según netlify.toml
          }))
        ),
        tap((data) => {
          console.log('Después de filtrar', data);
        }),
        catchError((error) => {
          console.log('Error al cargar las canciones aleatorias', error.message);
          return of([]);
        })
      );
  }
  // getAllRandom$(): Observable<any> {
  //   return this.http.get(`${this.URL}/tracks`)
  //     .pipe(
  //       map(({ data }: any) => {
  //         return data.map((track: any) => ({
  //           ...track,
  //           url: `https://api-reproductormusica-production.up.railway.app/${track.url}`
  //         }));
  //       }),
  //       mergeMap((tracks: any) => this.skipById(tracks, 2)),
  //       catchError((err) => {
  //         const { status, statusText } = err;
  //         return of([])
  //       })
  //     )
  // }
}
