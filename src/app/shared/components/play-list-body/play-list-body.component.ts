import { Component, OnInit } from '@angular/core';
import * as dataRaw from '../../../data/tracks.json';
import { TrackModel } from '@core/models/tracks.model';
import { CommonModule } from '@angular/common';
import { OrderListPipe } from '@shared/pipe/order-list.pipe';
import { ImgBrokenDirective } from '@shared/directives/img-broken.directive';

@Component({
  selector: 'app-play-list-body',
  standalone: true,
  imports: [CommonModule, OrderListPipe, ImgBrokenDirective],
  templateUrl: './play-list-body.component.html',
  styleUrl: './play-list-body.component.css'
})
export class PlayListBodyComponent implements OnInit {
  tracks: TrackModel[] = [];
  optionSort: { property: string | null, order: string } = { property: null, order: 'asc' }

  ngOnInit(): void {
    const { data }: any = (dataRaw as any).default;
    this.tracks = data;
  }

  changeSort(property: string): void {
    const { order } = this.optionSort
    this.optionSort = {
      property,
      order: order === 'asc' ? 'desc' : 'asc'
    }
    console.log(this.optionSort);
  }

}
