import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


export const sessionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);

  const token = cookieService.get('token');
  if (!token) {
    router.navigate(['/auth/login']);
    return false;
  }
  return true;

};


