import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { title } from 'node:process';

@Component({
  selector: 'app-media-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-player.component.html',
  styleUrl: './media-player.component.css'
})
export class MediaPlayerComponent {
  mockCover: TrackModel = {
    cover:'https://i.scdn.co/image/ab67616d0000b273f2c8e4a1f3c5b6d7f9e4b6a2',
    album: 'Mock Album',
    name: 'Mock Name',
    url: 'https://example.com/mock-url',
    _id: 'Mock Artist',
  }

}
