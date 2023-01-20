import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const passwordControl = formGroup.get(controlName);
        const confirmPasswordControl = formGroup.get(matchingControlName);
  
        if (!passwordControl || !confirmPasswordControl) {
          return null;
        }
  
        if (
          confirmPasswordControl.errors &&
          !confirmPasswordControl.errors['passwordMismatch']
        ) {
          return null;
        }
  
        if (passwordControl.value !== confirmPasswordControl.value) {
          confirmPasswordControl.setErrors({ passwordMismatch: true });
          return { passwordMismatch: true };
        } else {
          confirmPasswordControl.setErrors(null);
          return null;
        }
      };
  }