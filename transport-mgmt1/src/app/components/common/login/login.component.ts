import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppService } from '../../../service/app.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  constructor( private appService: AppService, 
    private router: Router){}
  
  formData: any = {

    email: '',
    password: ''

  }
  error: any = null;

  async handleSubmit(){

    console.log(this.formData.email);
    console.log(this.formData.password);

    if (!this.formData.email || !this.formData.password) {
      this.showError("Please fill all the fields correctly")
      return
    }

    this.appService.loginUser(this.formData).subscribe({
      next: (res:any) => {
        if (res.status === 200) {
          this.appService.storeToken('token', res.token);
          this.appService.storeToken('role', res.role);
          this.appService.storeToken('userName', res.userName);
          if(this.appService.isAdmin()){
              this.router.navigate(['/admindashboard']);
          }else if(this.appService.isCustomer()){
              this.router.navigate(['/customeradmin'])
          }else if(this.appService.isManager()){
              this.router.navigate(['/admindashboard'])
          }
          
        }
      },
      error: (err: any) => {
        this.showError(err?.error?.message || err.message || 'Unable To Login: ' + err)
      }
    });
  }

  showError(msg: string){
    this.error = msg;
    setTimeout(()=> {
      this.error = null
    }, 4000);
  }
}

