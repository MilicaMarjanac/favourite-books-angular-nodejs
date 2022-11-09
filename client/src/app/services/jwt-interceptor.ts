import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  public static nonBearerRoutes: RegExp[] = [/signin/, /signup/];

  constructor(private authService: AuthService) {}

  private static checkForNonBearerTokenRequests(requestUrl: string): boolean[] {
    return this.nonBearerRoutes.map((route: RegExp) => route.test(requestUrl));
  }

  private static addToken(
    req: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    if (this.checkForNonBearerTokenRequests(req.url).includes(true)) {
      return req;
    }

    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    });
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authService.getStoredToken() !== null) {
      request = JwtInterceptor.addToken(
        request,
        this.authService.getStoredToken()
      );
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log('Unauthorized');
        }
        throw error;
      })
    );
  }
}
