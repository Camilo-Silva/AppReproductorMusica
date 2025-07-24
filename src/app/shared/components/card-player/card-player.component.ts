import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { ImgBrokenDirective } from '@shared/directives/img-broken.directive';
import { MultimediaService } from '@shared/services/multimedia.service';


@Component({
  selector: 'app-card-player',
  standalone: true,
  imports: [CommonModule, ImgBrokenDirective],
  templateUrl: './card-player.component.html',
  styleUrl: './card-player.component.css'
})
export class CardPlayerComponent {
  constructor(private multimediaService: MultimediaService) {}

  preventKey(event: KeyboardEvent): void {
    if (
      event.key === ' ' ||
      event.key === 'Spacebar' ||
      event.code === 'Space' ||
      event.key === 'Enter' ||
      event.keyCode === 13 ||
      event.keyCode === 32
    ) {
      event.preventDefault();
      event.stopPropagation();
      this.multimediaService.togglePlayer();
    }
  }
  @Input() mode: 'small' | 'big' = 'small';
  @Input() track: TrackModel = {
    _id: '',
    name: '',
    album: '',
    url: '',
    cover: ''
  };

  @Output() playTrack = new EventEmitter<TrackModel>();

  onClick(): void {
    this.playTrack.emit(this.track);
  }

  // ...existing code...

}
