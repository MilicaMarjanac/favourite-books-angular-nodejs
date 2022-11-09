import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  public isValid(formGroup: FormGroup, controlName: string): boolean {
    return (
      formGroup.controls[controlName].errors === null ||
      !formGroup.controls[controlName].touched
    );
  }

  public showErrorMessage(
    formGroup: FormGroup,
    controlName: string
  ): string | null {
    if (formGroup.controls[controlName].errors !== null) {
      if (formGroup.controls[controlName].hasError('required')) {
        return 'This field is required';
      } else if (formGroup.controls[controlName].hasError('email')) {
        return 'Invalid email';
      } else if (formGroup.controls[controlName].hasError('pattern')) {
        return 'Invalid field';
      } else if (
        formGroup.controls[controlName].hasError('mustMatchPassword')
      ) {
        return 'Passwords do not match';
      } else if (formGroup.controls[controlName].hasError('maxlength')) {
        return 'Maximum length is 30 characters';
      } else return null;
    } else {
      return null;
    }
  }
}
