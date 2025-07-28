import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MultimediaService } from '@shared/services/multimedia.service';
import { TrackModel } from '@core/models/tracks.model';
import { CardPlayerComponent } from "../card-player/card-player.component";

@Component({
  selector: 'app-section-generic',
  standalone: true,
  imports: [CommonModule, CardPlayerComponent],
  templateUrl: './section-generic.component.html',
  styleUrl: './section-generic.component.css'
})
export class SectionGenericComponent {
  @Input() title: string = '';
  @Input() mode: 'small' | 'big' = 'big';
  @Input() dataTracks: Array<TrackModel> = [];

  constructor(private multimediaService: MultimediaService) {}

  playTrack(track: TrackModel): void {
    // Pasar la canción y la lista completa para habilitar navegación
    this.multimediaService.setAudio(track, this.dataTracks);
    this.multimediaService.trackInfo$.next(track);
  }
}
