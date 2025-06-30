import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MultimediaService {
  callback: EventEmitter<any> = new EventEmitter<any>();
  //Este servicio se utiliza para gestionar operaciones multimedia, como la reproducción de audio, vídeo, etc.
  // Utiliza un EventEmitter para comunicarse con otros componentes o servicios.
  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public audio!: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
    this.trackInfo$.subscribe(responseOk => {
      if (responseOk) {
        this.setAudio(responseOk);
      }
    });
  }

  //Funciones publicas
  public setAudio(track: TrackModel): void {
    console.log('🛑🛑🛑🛑🛑🛑🛑🛑🛑 setAudio', track);
    this.audio.src = track.url ?? '';    
    this.audio.play();
  }

}

