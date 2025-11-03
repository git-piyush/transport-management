import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../models/vehicle.model';

@Component({
  selector: 'app-addvehicle',
  imports: [FormsModule, CommonModule],
  templateUrl: './addvehicle.component.html',
  styleUrl: './addvehicle.component.css',
})
export class AddvehicleComponent {

  vehicleDetails = {
    imageFile: null,
    permitLevel:'',
    vehicleType:'',
    vehicleRegNo:'',
    driverMob:'',
    capacity:'',
    price:'',
    originCity:'',
    destinationCity:'',
    description: ''
  };

  vehicleTypes: string[] = [];
  permitLevels: string[] = [];
  roomTypes: string[] = [];
  newRoomType: string = '';

  file: File | null = null;
  preview: string | null = null;

  error: any = null;
  success: string = '';
  
 constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchVehiclePermitLevel();
    this.fetchVehicleTypes();
  }

  showError(msg: string) {
    this.error = msg;
    setTimeout(() => {
      this.error = null;
    }, 4000); // Clear the error after 5 seconds
  }

  fetchVehicleTypes() {
    this.apiService.fetchVehicleTypes().subscribe({
      next: (vehicleTypes: string[]) => {
        this.vehicleTypes = vehicleTypes;
      },
      error: (err) => {
        this.showError(
          err?.error?.message || 'Error fetching vehicle types: ' + err
        );
      },
    });
  }

  fetchVehiclePermitLevel() {
    this.apiService.fetchVehiclePermitLevel().subscribe({
      next: (permitLevels: string[]) => {
        this.permitLevels = permitLevels;
      },
      error: (err) => {
        this.showError(
          err?.error?.message || 'Error fetching vehicle Permit Level: ' + err
        );
      },
    });
  }

  // Handle form input changes
  handleChange(event: Event) {
    const { name, value } = <HTMLInputElement>event.target;
    this.vehicleDetails = { ...this.vehicleDetails, [name]: value };
  }
    // Handle room type change
  handleVehicleTypeChange(event: Event) {
    this.vehicleDetails.vehicleType = (<HTMLSelectElement>event.target).value;
  }

  handleVehiclePermitLevelChange(event: Event) {
    this.vehicleDetails.permitLevel = (<HTMLSelectElement>event.target).value;
  }

  // Handle file input change (image upload)
  handleFileChange(event: Event) {
    const input = <HTMLInputElement>event.target;
    const selectedFile = input.files ? input.files[0] : null;
    if (selectedFile) {
      this.file = selectedFile;
      this.preview = URL.createObjectURL(selectedFile);
    } else {
      this.file = null;
      this.preview = null;
    }
  }

  // Add room function
  addRoom() {
    if (
      !this.vehicleDetails.permitLevel ||
      !this.vehicleDetails.vehicleType ||
      !this.vehicleDetails.vehicleRegNo||
      !this.vehicleDetails.driverMob||
      !this.vehicleDetails.capacity||
      !this.vehicleDetails.price||
      !this.vehicleDetails.originCity||
      !this.vehicleDetails.destinationCity

    ) {
      this.showError('All room details must be provided.');
      return;
    }

    if (!window.confirm('Do you want to add this Vehicle?')) {
      return;
    }

    const formData = new FormData();
    formData.append('permitLevel', this.vehicleDetails.permitLevel);
    formData.append('vehicleType', this.vehicleDetails.vehicleType);
    formData.append('vehicleRegNo', this.vehicleDetails.vehicleRegNo);
    formData.append('driverMob', this.vehicleDetails.driverMob);
    formData.append('capacity', this.vehicleDetails.capacity);
    formData.append('price', this.vehicleDetails.price);
    formData.append('originCity', this.vehicleDetails.originCity);
    formData.append('destinationCity', this.vehicleDetails.destinationCity);
    formData.append('description', this.vehicleDetails.description);

    const vehicle = new Vehicle({
       imageFile: this.file,
        permitLevel: this.vehicleDetails.permitLevel,
        vehicleType: this.vehicleDetails.vehicleType,
        vehicleRegNo: this.vehicleDetails.vehicleRegNo,
        driverMob: this.vehicleDetails.driverMob,
        capacity: this.vehicleDetails.capacity,
        price: this.vehicleDetails.price,
        originCity: this.vehicleDetails.originCity,
        destinationCity: this.vehicleDetails.destinationCity,
        description: this.vehicleDetails.description
      });

      


    if (this.file) {
      formData.append('imageFile', this.file);
    }
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
    this.apiService.addVehicle(formData).subscribe({      
      next: (response) => {
        console.log(response);
        this.success = 'Vehicle Added successfully.';
        setTimeout(() => {
          this.success = '';
          this.router.navigate(['/admin/manage-rooms']);
        }, 5000);
      },
      error: (error) => {
        console.log(error);
        this.showError(error?.error?.message || 'Error adding vehicle');
      },
    });
  }

}
