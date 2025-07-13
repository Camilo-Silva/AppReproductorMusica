import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MultimediaService } from '@shared/services/multimedia.service';
import { SectionGenericComponent } from "../../../../shared/components/section-generic/section-generic.component";

import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { firstValueFrom, Subscription } from 'rxjs';


@Component({
  selector: 'app-tracks-page',
  standalone: true,
  imports: [SectionGenericComponent],
  templateUrl: './tracks-page.component.html',
  styleUrl: './tracks-page.component.css'
})
export class TracksPageComponent implements OnInit, OnDestroy {
  tracksTrending: Array<TrackModel> = [];
  tracksRandom: Array<TrackModel> = [];

  listObservers$: Array<Subscription> = [];
  private trackService = inject(TrackService);
  private multimediaService = inject(MultimediaService);

  ngOnInit(): void {
    this.loadDataAll();
    this.loadDataRandom();
    document.addEventListener('keydown', this.handleGlobalKey);
  }

  async loadDataAll(): Promise<any> {
    // this.tracksTrending = await this.trackService.getAllTracks$().toPromise()//forma deprecada
    this.tracksTrending = await firstValueFrom(this.trackService.getAllTracks$());//Forma recomendada
    // console.log('Datos de todas las canciones', dataRaw);
  }

  loadDataRandom(): void {
    this.trackService.getAllRandom$().subscribe({
      next: (response: TrackModel[]) => {
        this.tracksRandom = response;}
      // },
      // error: (err) => {
      //   console.log('Error al cargar las canciones aleatorias');
      // }
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.handleGlobalKey);
  }

  handleGlobalKey = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement;
    const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
    const isButton = target.tagName === 'BUTTON';
    if (isInput || isButton) return;

    // Detectar barra espaciadora y enter
    if (
      event.key === ' ' ||
      event.key === 'Spacebar' ||
      event.code === 'Space' ||
      event.keyCode === 32 ||
      event.key === 'Enter' ||
      event.keyCode === 13
    ) {
      event.preventDefault();
      this.multimediaService.togglePlayer();
    }
  }

}