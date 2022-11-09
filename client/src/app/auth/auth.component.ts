import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  private authNotifier$ = new Subject<void>();
  public incorrectMailOrPassword: boolean;
  constructor(private authService: AuthService, protected router: Router) {}

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn) {
      this.router.navigate(['/books']);
    }
  }
  ngOnDestroy(): void {
    this.authNotifier$.next();
    this.authNotifier$.complete();
  }

  public onAuthFormSubmit(formGroup: FormGroup, isSignIn: boolean): void {
    this.incorrectMailOrPassword = false;
    if (formGroup.valid) {
      if (!isSignIn) {
        delete formGroup.value.confirmPassword;
      }
      let path = isSignIn ? '/books' : '/';
      let request = isSignIn
        ? this.authService.signInUser(formGroup.value)
        : this.authService.signUpUser(formGroup.value);
      request.pipe(takeUntil(this.authNotifier$)).subscribe({
        next: (user: User) => {
          if (user && user.token) {
            this.authService.storeUserData(user, user.token);
          }
          this.router.navigate([path]);
        },
        error: (error: HttpErrorResponse) => {
          this.incorrectMailOrPassword = true;
        },
      });
    }
  }
}
