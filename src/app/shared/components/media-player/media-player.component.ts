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
    _id: 1,
    name: "Getting Over",
    album: "One Love",
    cover: "https://jenesaispop.com/wp-content/uploads/2009/09/guetta_onelove.jpg",
    
  }

}
