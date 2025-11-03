import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink, MatSnackBarModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  constructor( private apiService: ApiService, private router: Router, private snackBar: MatSnackBar){}
  
  formData: any = {

    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: ''
  }

  error: any = null;

  handleSubmit(){
    if (
      !this.formData.email ||
      !this.formData.firstName ||
      !this.formData.lastName ||
      !this.formData.phoneNumber ||
      !this.formData.password 
    ) {
      this.showError('Please all fields are required');
      return
    }

    this.apiService.registerUser(this.formData).subscribe({
      next:(res: any) => {
        this.snackBar.open("Registration Sucessful", 'Close',{
        duration: 5000
      });
        this.router.navigate(['/login'])
      },
      error: (err: any) => {
        this.showError(err?.error?.message || err.message || 'Unable to Register a user: ' + err)
      }
    });
  }

  showError(msg: string){
    this.error = msg;
    setTimeout(()=> {
      this.error = null
    }, 8000);
  }
}
