import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicleresult',
  imports: [CommonModule],
  templateUrl: './vehicleresult.component.html',
  styleUrl: './vehicleresult.component.css',
})
export class VehicleresultComponent {
      @Input() vehicleSearchResults: any[] = []; // Input property for room results
      isAdmin: boolean;

      constructor(private router: Router, private apiService: ApiService) {
        // Get the current user's admin status
        this.isAdmin = this.apiService.isAdmin();
      }

      // Method to navigate to the edit room page (for admins)
      navigateToEditVehicle(vehicleId: string) {
        this.router.navigate([`/admin/edit-vehicle/${vehicleId}`]);
      }

      // Method to navigate to the room details page (for users)
      navigateToVehicleDetails(vehicleId: string) {
        this.router.navigate([`/vehicle-details/${vehicleId}`]);
      }
}
