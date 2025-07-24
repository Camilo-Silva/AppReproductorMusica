
import { TestBed } from '@angular/core/testing';
import { InjectTokenInterceptor } from './inject-token.interceptor';
import { CookieService } from 'ngx-cookie-service';

describe('InjectTokenInterceptor', () => {
  let interceptor: InjectTokenInterceptor;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CookieService', ['get']);
    TestBed.configureTestingModule({
      providers: [
        InjectTokenInterceptor,
        { provide: CookieService, useValue: spy }
      ]
    });
    interceptor = TestBed.inject(InjectTokenInterceptor);
    cookieServiceSpy = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
