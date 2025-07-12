import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
  listObservers$: Array<Subscription> = [];//TODO: Se le llama como programación reactiva.
  // Esta propiedad se utiliza para almacenar las suscripciones a los observables.  
  state: string = 'paused'; // Estado inicial del reproductor

  constructor(public multimediaService: MultimediaService) {}

  ngOnInit(): void {
    const observer1$ = this.multimediaService.playerStatus$.subscribe(status => this.state = status);
    
    
  }

  ngOnDestroy(): void {
    // Aquí puedes limpiar las suscripciones si es necesario
    console.log('🛑🛑🛑🛑🛑🛑🛑🛑🛑 BOOOM MediaPlayerComponent destruido');
    // Si necesitas limpiar la suscripción, puedes hacerlo aquí:
    // observer1$.unsubscribe();
  }

  handlePosition(event: MouseEvent): void {
    const elNative: HTMLElement = this.progressBar.nativeElement
    const { clientX } = event
    const { x, width } = elNative.getBoundingClientRect()
    const clickX = clientX - x //TODO: 1050 - x
    const percentageFromX = (clickX * 100) / width
    console.log(`Click(x): ${percentageFromX}`);
    this.multimediaService.seekAudio(percentageFromX);
  }

}
