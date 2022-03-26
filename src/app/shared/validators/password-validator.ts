import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// AWS password policy: https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-policies.html
// Reg exp ref: https://stackoverflow.com/a/58767981
// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character ^ $ * . [ ] { } ( ) ? " ! @ # % & / \ , > < ' : ; | _ ~ ` = + -
export const passwordRegExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-\"!@#%&\/,><\':;|_~`])\S{8,99}$/);

export const passwordRequirementMessage = 'Password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const isValidPassword = passwordRegExp.test(control.value);
  return !isValidPassword ? { password: true } : null;
}