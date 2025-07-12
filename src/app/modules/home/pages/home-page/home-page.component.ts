import { Component } from '@angular/core';

import { SideBarComponent } from "@shared/components/side-bar/side-bar.component";
import { MediaPlayerComponent } from "@shared/components/media-player/media-player.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  imports: [SideBarComponent, MediaPlayerComponent, RouterOutlet],
  
})
export class HomePageComponent {

}
