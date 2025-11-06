import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AppService } from './service/app.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  userName: string | null = null;
  [x: string]: any;
  constructor(private router: Router,private cdRef: ChangeDetectorRef,private appService:AppService){}
  isDarkTheme = false;

  ngOnInit(): void {
    //this.getLoggedInUserName();
    const savedTheme = localStorage.getItem('theme');
    this.isDarkTheme = savedTheme === 'dark';
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
  }

  logout(){
      this.appService.clearAuth();
      this.userName=null;
      this.router.navigate(['/login']);
  }
  getLoggedInUserName(){
    this.userName = this.appService.getLoggedInUserName();
  }

  get isAuthemticated():boolean{
    return this.appService.isAuthenticated();
  }

  get isCustomer():boolean{
    return this.appService.isCustomer();
  }

  get isAdmin():boolean{
    return this.appService.isAdmin();
  }

}
