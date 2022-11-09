import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthComponent } from '../../auth.component';
import { AuthService } from '../../../services/auth.service';
import { FormsService } from 'src/app/services/forms.service';
import { phoneNumber } from 'src/app/utils/regex';
import { MustMatch } from 'src/app/utils/match.validator';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent extends AuthComponent implements OnInit {
  public signUpFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public formService: FormsService,
    authService: AuthService,
    router: Router
  ) {
    super(authService, router);
  }

  override ngOnInit(): void {
    this.initSignUpForm();
  }

  private initSignUpForm(): void {
    this.signUpFormGroup = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.maxLength(30)]],
        lastName: ['', [Validators.required, Validators.maxLength(30)]],
        phone: ['', [Validators.required, Validators.pattern(phoneNumber)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: MustMatch.confirmed('password', 'confirmPassword') }
    );
  }
}
