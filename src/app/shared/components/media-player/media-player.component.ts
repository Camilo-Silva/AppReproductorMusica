import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';//TODO: Se le llama como programación reactiva.

@Component({
  selector: 'app-media-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-player.component.html',
  styleUrl: './media-player.component.css'
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  
  
  listObservers$: Array<Subscription> = [];//TODO: Se le llama como programación reactiva.
  // Esta propiedad se utiliza para almacenar las suscripciones a los observables.  

  constructor(public multimediaService: MultimediaService) {}

  ngOnInit(): void {
    
    
  }

  ngOnDestroy(): void {
    // Aquí puedes limpiar las suscripciones si es necesario
    console.log('🛑🛑🛑🛑🛑🛑🛑🛑🛑 BOOOM MediaPlayerComponent destruido');
    // Si necesitas limpiar la suscripción, puedes hacerlo aquí:
    // observer1$.unsubscribe();
  }

}
