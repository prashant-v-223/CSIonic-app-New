import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character (@$!%*#?&)
export const passwordRegExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);

export const passwordRequirementMessage = 'Password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character (@$!%*#?&)';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const isValidPassword = passwordRegExp.test(control.value);
  return !isValidPassword ? { password: true } : null;
}