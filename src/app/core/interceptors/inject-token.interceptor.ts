import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class InjectTokenInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    try {
      // Usar el mismo nombre de cookie que se guarda en auth.service.ts
      const token = this.cookieService.get('token_Service');
      
      if (token) {
        const newReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(newReq);
      }
      
      return next.handle(req);
    } catch (error) {
      console.log('Error in InjectTokenInterceptor:', error);
      return next.handle(req);
    }
  }
}
