import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private static BASE_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  loginUser(body: any): Observable<any> {
    return this.http.post(`${AppService.BASE_URL}/auth/login`, body);
  }
  storeToken(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
    // AUTH API METHODS
  registerUser(body: any): Observable<any> {
    return this.http.post(`${AppService.BASE_URL}/auth/register`, body);
  }
  clearAuth(){
    this.logOut();
  }  
  //clear authentication data
  private logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
  }
  
  getLoggedInUserName():string | null{
    return this.getUserName('userName');
  }
  // Retrieve from localStorage and decrypt
  private getUserName(key: string): string | null {
    try {
      const userName = localStorage.getItem(key);
      if (!userName) return null;
      return userName;
    } catch (error) {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getFromStorage('token');
    return !!token;
  }

  isAdmin(): boolean {
    const role = this.getFromStorage('role');
    return role === 'ADMIN';
  }

  isCustomer(): boolean {
    const role = this.getFromStorage('role');
    return role === 'CUSTOMER';
  }

    isManager(): boolean {
    const role = this.getFromStorage('role');
    return role === 'MANAGER';
  }

    // Retrieve from localStorage and decrypt
  private getFromStorage(key: string): string | null {
    try {
      const value = localStorage.getItem(key);
      return value
    } catch (error) {
      return null;
    }
  }

}
