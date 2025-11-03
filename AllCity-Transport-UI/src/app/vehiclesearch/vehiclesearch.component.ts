import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../service/api.service';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-vehiclesearch',
  imports: [CommonModule, FormsModule],
  templateUrl: './vehiclesearch.component.html',
  styleUrl: './vehiclesearch.component.css',
})
export class VehiclesearchComponent implements OnInit{

  @Output() searchResults = new EventEmitter<any[]>(); // Emit the results
  fromCities: string[] = [];
  fromCity: string='';
  startDate: string | null = null; // Store date as string
  endDate: string | null = null; // Store date as string
  roomType: string = ''; // Selected room type
  roomTypes: string[] = []; // Available room types
  error: any = null;

  minDate: string = new Date().toISOString().split('T')[0]; // Current date in 'yyyy-MM-dd' format

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchRoomTypes();
   // this.fetchAllOriginCity();
  }

  fetchRoomTypes() {
    this.apiService.getRoomTypes().subscribe({
      next: (types: any) => {
        this.roomTypes = types;
      },
      error: (err:any) => {
        this.showError(
          err?.error?.message || 'Error Fetching Room Types: ' + err
        );
        console.error(err);
      },
    });
  }

    fetchAllOriginCity() {
    this.apiService.getRoomTypes().subscribe({
      next: (types: any) => {
        this.roomTypes = types;
      },
      error: (err:any) => {
        this.showError(
          err?.error?.message || 'Error Fetching Room Types: ' + err
        );
        console.error(err);
      },
    });
  }

  showError(msg: string): void {
    this.error = msg;
    setTimeout(() => {
      this.error = null;
    }, 5000);
  }

  handleSearch() {
    this.apiService.getAvailableRooms()
      .subscribe({
        next: (resp: any) => {
          console.log(resp);
          if (resp.vehicleDTOS.length === 0) {
            this.showError(
              'Room type not currently available for the selected date'
            );
            return;
          }
          this.searchResults.emit(resp.vehicleDTOS); // Emit the room data
          this.error = ''; // Clear any previous errors
        },
        error: (error:any) => {
          this.showError(error?.error?.message || error.message);
        },
      });
  }

}
