import { Routes } from '@angular/router';
import { HomeComponent } from './components/common/home/home.component';
import { LoginComponent } from './components/common/login/login.component';
import { AdmindashboardComponent } from './components/admin/admindashboard/admindashboard.component';
import { appGuard } from './guard/app.guard';
import { RegisterComponent } from './components/common/register/register.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, pathMatch:'full'},
    {path: 'login', component: LoginComponent},
    {path: 'admindashboard', component: AdmindashboardComponent, canActivate:[appGuard]},
    {path: 'register', component: RegisterComponent}
];
