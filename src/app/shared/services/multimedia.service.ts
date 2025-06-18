import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>();
  //Este servicio se utiliza para gestionar operaciones multimedia, como la reproducción de audio, vídeo, etc.
  // Utiliza un EventEmitter para comunicarse con otros componentes o servicios.
  constructor() { }
}
