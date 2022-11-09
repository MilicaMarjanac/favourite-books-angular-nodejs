import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthComponent } from '../../auth.component';
import { AuthService } from '../../../services/auth.service';
import { FormsService } from 'src/app/services/forms.service';

@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent extends AuthComponent implements OnInit {
  public signInFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public formService: FormsService,
    authService: AuthService,
    router: Router
  ) {
    super(authService, router);
  }

  override ngOnInit(): void {
    this.initSignInForm();
  }

  private initSignInForm(): void {
    this.signInFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
