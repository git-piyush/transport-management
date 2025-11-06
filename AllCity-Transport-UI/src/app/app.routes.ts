import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GuardService } from './service/guard.service';

export const routes: Routes = [
    { path: 'login', component:LoginComponent},
    {path: '**', redirectTo: 'home'}
];
