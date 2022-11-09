import { AbstractControl, ValidationErrors } from '@angular/forms';

class MustMatch {
  static confirmed = (controlName: string, matchingControlName: string) => {
    return (control: AbstractControl): ValidationErrors | null => {
      const input = control.get(controlName);
      const matchingInput = control.get(matchingControlName);

      if (input === null || matchingInput === null) {
        return null;
      }

      if (matchingInput?.errors && !matchingInput.errors['mustMatchPassword']) {
        return null;
      }

      if (input.value !== matchingInput.value) {
        matchingInput.setErrors({ mustMatchPassword: true });
        return { mustMatchPassword: true };
      } else {
        matchingInput.setErrors(null);
        return null;
      }
    };
  };
}

export { MustMatch };
