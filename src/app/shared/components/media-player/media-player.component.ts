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
  showToast: boolean = false; // Controla la visibilidad del toast
  toastTimer: any; // Timer para ocultar el toast automáticamente

  constructor(public multimediaService: MultimediaService) {}

  ngOnInit(): void {
    const observer1$ = this.multimediaService.playerStatus$.subscribe(status => {
      this.state = status;
      // Mostrar toast cuando comienza a reproducir
      if (status === 'playing') {
        this.showTrackToast();
      }
    });
    
    this.listObservers$.push(observer1$);
  }

  ngOnDestroy(): void {
    // Limpiar las suscripciones
    this.listObservers$.forEach(u$ => u$.unsubscribe());
    // Limpiar el timer del toast si existe
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    console.log('🛑🛑🛑🛑🛑🛑🛑🛑🛑 BOOOM MediaPlayerComponent destruido');
  }

  showTrackToast(): void {
    // Limpiar timer anterior si existe
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    
    // Mostrar el toast
    this.showToast = true;
    
    // Ocultar automáticamente después de 5 segundos
    this.toastTimer = setTimeout(() => {
      this.hideToast();
    }, 5000);
  }

  hideToast(): void {
    this.showToast = false;
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
      this.toastTimer = null;
    }
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
