import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class DynamicControlService {

  constructor() { }

  toFormGroup(inputControls: any): FormGroup {
    const group: any = {};
    inputControls.forEach((inputControl: any) => {
      group[inputControl.key] = inputControl.required ?
        new FormControl({ value: inputControl.value || (inputControl.type === 'checkbox' ? false : ''), disabled: inputControl.isdisabled }, Validators.required)
        : new FormControl({ value: inputControl.value || (inputControl.type === 'checkbox' ? false : ''), disabled: inputControl.isdisabled });
    });


    return new FormGroup(group);
  }
}
