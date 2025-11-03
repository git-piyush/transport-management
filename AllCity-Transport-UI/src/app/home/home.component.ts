import { Component } from '@angular/core';
import { VehiclesearchComponent } from '../vehiclesearch/vehiclesearch.component';
import { VehicleresultComponent } from '../vehicleresult/vehicleresult.component';

@Component({
  selector: 'app-home',
  imports: [VehiclesearchComponent, VehicleresultComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

    searchResults: any[] = [] // store the result of the searched room

  // handle the result comming from the vehiclesearch component
    handleSearchResult(results: any[]){
    this.searchResults = results
  }

}
