import { Component } from '@angular/core';
import { SearchComponent } from "../../components/search/search.component";
import { PlayListBodyComponent } from "../../../../shared/components/play-list-body/play-list-body.component";
import { SearchService } from '@modules/history/services/search.service';
import { TrackModel } from '@core/models/tracks.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [SearchComponent, PlayListBodyComponent, HttpClientModule],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css'
})
export class HistoryPageComponent {  
  listResults: TrackModel[] = [];
  constructor(private readonly searchService: SearchService) { }

  receiveData(event: string): void {    console.log('Datos recibidos en EL PADRE JUA JUA', event);
    this.searchService.searchTracks$(event).subscribe({
      next: (data) => {
       this.listResults = data.data ?? data.results ?? data.tracks ?? data.items ?? [];
          
        // if (data && typeof data === 'object' && !Array.isArray(data)) {
        //   // Intentar extraer el array de diferentes propiedades posibles
        //   this.listResults = data.data ?? data.results ?? data.tracks ?? data.items ?? [];
        // } else if (Array.isArray(data)) {
        //   // Si data ya es un array
        //   this.listResults = data;
        // } else {
        //   // Si no es ni objeto ni array, inicializar como array vacío
        //   this.listResults = [];
        // }

        console.log('listResults actualizado:', this.listResults);
      },
      error: (error) => {
        console.error('Error en la búsqueda:', error);
        this.listResults = []; // Asegurar que sea array vacío en caso de error
      }
    });
    // Aquí puedes manejar los datos recibidos desde SearchComponent
  }

}
