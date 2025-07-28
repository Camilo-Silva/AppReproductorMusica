import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';//TODO: Se le llama como programación reactiva.

@Component({
  selector: 'app-media-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-player.component.html',
  styleUrl: './media-player.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
  @ViewChild('timeElapsedElement') timeElapsedElement: ElementRef = new ElementRef('');
  @ViewChild('timeRemainingElement') timeRemainingElement: ElementRef = new ElementRef('');
  listObservers$: Array<Subscription> = [];//TODO: Se le llama como programación reactiva.
  // Esta propiedad se utiliza para almacenar las suscripciones a los observables.  
  state: string = 'paused'; // Estado inicial del reproductor
  showToast: boolean = false; // Controla la visibilidad del toast
  toastTimer: any; // Timer para ocultar el toast automáticamente
  
  // Propiedades para los tiempos
  timeElapsed: string = '00:00';
  timeRemaining: string = '-00:00';
  playerPercentage: number = 0;

  constructor(public multimediaService: MultimediaService, private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit(): void {
    const observer1$ = this.multimediaService.playerStatus$.subscribe(status => {
      this.ngZone.run(() => {
        this.state = status;
        // Mostrar toast cuando comienza a reproducir
        if (status === 'playing') {
          this.showTrackToast();
        }
        this.cdr.markForCheck();
      });
    });
    
    const observer2$ = this.multimediaService.timeElapsed$.subscribe(time => {
      this.ngZone.run(() => {
        this.timeElapsed = time;
        
        // Actualizar DOM directamente como fallback
        if (this.timeElapsedElement && this.timeElapsedElement.nativeElement) {
          this.timeElapsedElement.nativeElement.textContent = time;
        }
        
        this.cdr.markForCheck();
      });
    });
    
    const observer3$ = this.multimediaService.timeRemaining$.subscribe(time => {
      this.ngZone.run(() => {
        this.timeRemaining = time;
        
        // Actualizar DOM directamente como fallback
        if (this.timeRemainingElement && this.timeRemainingElement.nativeElement) {
          this.timeRemainingElement.nativeElement.textContent = time;
        }
        
        this.cdr.markForCheck();
      });
    });
    
    const observer4$ = this.multimediaService.playerPorcentage$.subscribe(percentage => {
      this.ngZone.run(() => {
        this.playerPercentage = percentage;
        this.cdr.markForCheck();
      });
    });
    
    this.listObservers$.push(observer1$, observer2$, observer3$, observer4$);
  }

  ngOnDestroy(): void {
    // Limpiar las suscripciones
    this.listObservers$.forEach(u$ => u$.unsubscribe());
    // Limpiar el timer del toast si existe
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
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
    const clickX = clientX - x
    const percentageFromX = (clickX * 100) / width
    this.multimediaService.seekAudio(percentageFromX);
  }

  nextTrack(): void {
    this.multimediaService.nextTrack();
  }

  previousTrack(): void {
    this.multimediaService.previousTrack();
  }

  get hasTrackList(): boolean {
    return this.multimediaService.trackList.length > 0;
  }

}
