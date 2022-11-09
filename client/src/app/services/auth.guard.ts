import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router, public authService: AuthService) {}

  canLoad(): boolean {
    if (!this.authService.isUserLoggedIn) {
      this.router.navigate(['signin']);
      return false;
    }
    return true;
  }
}
