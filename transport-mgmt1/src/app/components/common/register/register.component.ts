import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../../../service/app.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private appService: AppService, private router:Router, private snackBar:MatSnackBar){}

    formData: any = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber:''
    };
    error: any = null;

    async handleRegister() {
      const { firstName, lastName, email, password, confirmPassword, phoneNumber } = this.formData;

      if (!firstName || !email || !password || !confirmPassword || !phoneNumber) {
        this.showError("Please fill all the fields correctly");
        return;
      }

      if (password !== confirmPassword) {
        this.showError("Passwords do not match.");
        return;
      }

      this.appService.registerUser(this.formData).subscribe({
        next: (res: any) => {
          alert(res.status);
          if (res.status === 200) {
            this.snackBar.open("Registration Success","Close", { duration: 5000 })
            this.router.navigate(['/login']);
          }
        },
        error: (err: any) => {
          this.showError(err?.error?.message || err.message || 'Unable to register: ' + err);
        }
      });
    }

    showError(msg: string) {
      this.error = msg;
      setTimeout(() => {
        this.error = null;
      }, 4000);
    }
}
