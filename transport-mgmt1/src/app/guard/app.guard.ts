import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppService } from '../service/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const appGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const appService = inject(AppService);
  const snackbar = inject(MatSnackBar);
    if(appService.isAuthenticated()){
      if(appService.isAdmin()){
        return true;
      }else if(appService.isCustomer()){
        return true;
      }else if(appService.isManager()){
        return true;
      }
    }
  snackbar.open("You don't have access to this page.","Close", { duration: 5000 });
  router.navigateByUrl("/login");
  return false;
};
