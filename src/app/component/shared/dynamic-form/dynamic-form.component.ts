import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { MatAccordion } from '@angular/material/expansion';
import { DynamicBase } from '../../../dynamic-controls/dynamic-base';
import { DynamicControlService } from '../../../services/dynamic-control.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { ContractService } from 'src/app/services/contract.service';
import { RoleService } from 'src/app/services/role.service';
// import { AuthService } from 'src/app/services/auth.service';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { UserdetailsService } from 'src/app/services/userdetails.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [DynamicControlService]
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() inputControls: DynamicBase<string>[] = [];
  @Input() inlinetableData: any;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formChanges = new EventEmitter<any>();
  @ViewChild(MatAccordion) accordion: MatAccordion | any;
  @Input() toShowExpansionPanel: any;
  @Input() inlineEditTable: any;
  @Input() readonly: any;
  @Input() resetpwd: any;
  form: FormGroup | any;
  groupArray: any = [];
  showButton = false;
  resetValue = [];
  submitted = false;
  updatedvalue: any;
  @Output() triggeredData = new EventEmitter<any>();
  uploadedFile: any = [];
  roles: any = [];
  resetemailinput: any;
  forgotPassword: boolean = false;
  user: any;

  constructor(private qcs: DynamicControlService, public roleservice: RoleService) { }

  handleEditableTableEvent(data: any) {
    this.triggeredData.emit(data);
  }

  selectedFile(data: any) {
    this.uploadedFile = data;
  }

  showToggleBtn() {
    this.showButton = !this.showButton;
  }

  ngOnInit(): void {
    this.form = this.qcs.toFormGroup(this.inputControls);
    if (this.form.controls['email']) {
      this.form.controls['email'].setValidators([Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,10}$"), Validators.required])
    }
  }

  ngOnChanges(): void {
    this.updatedvalue = this.inputControls[0].value;
    this.form = this.qcs.toFormGroup(this.inputControls);
  }

  onSubmit(): void {
    this.formSubmit.emit({ form: this.form.getRawValue() });
    this.submitted = false;
  };

  isRoleAvailabe() {
    let flag = true;
    if (this.notNull(this.roles)) {
      this.roles.forEach((element: any) => {
        if (this.form.value.role === element) {
          flag = false;
        }
      });
    }
    return flag;
  }

  notNull(data: any): boolean {
    return data && data !== "";
  }

  reset() {
    this.submitted = false;
    this.resetValue = [];
    this.updatedvalue = '';
  }
}

