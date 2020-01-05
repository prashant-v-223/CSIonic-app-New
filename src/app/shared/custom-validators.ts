import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export function fieldEqual(firstCtrlName: string, secondCtrlName: string): ValidatorFn {

  return (formGroup: FormGroup): ValidationErrors | null => {

    const firstCtrl = formGroup.get(firstCtrlName);
    const secondCtrl = formGroup.get(secondCtrlName);

    if (firstCtrl && secondCtrl && firstCtrl.value !== secondCtrl.value)
      return { 'fieldEqual': true }

    return null;
  }

}