import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private baseUrl = environment.apiUrl;

  public signUpUser(user: User): Observable<any> {
    return this.http
      .post<User>(`${this.baseUrl}users/signup`, user)
      .pipe(catchError(this.handleError));
  }

  public signInUser(user: Partial<User>): Observable<User | HttpErrorResponse> {
    return this.http
      .post<User>(`${this.baseUrl}users/signin`, user)
      .pipe(catchError(this.handleError));
  }

  public storeUserData(user: User, token: string): void {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', JSON.stringify(token));
  }

  public getStoredToken(): string {
    const storedToken = localStorage.getItem('token');

    if (
      storedToken !== null &&
      storedToken !== '' &&
      storedToken !== 'undefined' &&
      storedToken.includes('"')
    ) {
      return JSON.parse(storedToken);
    }

    return '';
  }

  public get isUserLoggedIn(): boolean {
    const storedUser = localStorage.getItem('user');
    if (
      storedUser !== null &&
      storedUser !== '' &&
      storedUser !== 'undefined' &&
      storedUser.includes('"')
    ) {
      return true;
    }
    return false;
  }

  public signOutUser(): Observable<any> {
    return this.http
      .post<User>(`${this.baseUrl}users/signout`, {})
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    return throwError(() => {
      return error;
    });
  }
}
