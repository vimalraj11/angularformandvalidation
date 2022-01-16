import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { DynamicBase } from '../../../dynamic-controls/dynamic-base';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
// import { NavigationService } from 'src/app/services/navigation.service';
import * as _ from 'lodash';
import { RoleService } from 'src/app/services/role.service';
// import { CompanyCreationService } from 'src/app/services/company-creation.service';
// import { UploadFileService } from 'src/app/services/upload-file.service';
// import { FileUpload } from 'src/app/models/fileupload';
// import { ContractService } from 'src/app/services/contract.service';
// import { UtilityService } from 'src/app/services/utility.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
// import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/models/format-datepicker/format-datepicker.module';
// import { UserdetailsService } from 'src/app/services/userdetails.service';
// import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.css'],
  // providers: [
    // { provide: DateAdapter, useClass: AppDateAdapter },
    // { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  // ]
})

export class DynamicFormControlComponent implements OnInit {
  @ViewChild("fileUpload") fileUpload: ElementRef | any;
  @Input() inputControl: DynamicBase<string> | any;
  @Input() form: FormGroup | any;
  @Input() resetValue: any;
  @Input() submitted: any;
  selectedFiles: FileList | any;
  @Output() uploadedFile = new EventEmitter<any>();
  selectedArrayValues = new FormControl();
  filteredOption: any = [];
  requestedDateofProcedure: any;
  file: any = [];
  currencyOptions: any;
  contryCode: any;
  roleList: any = [];
  companyList: any = [];
  url: any;
  contractList: any = [];
  duplicateFlag = false;
  reset = false;
  firstNameprefix: any = [];
  currentRole: string | any;
  currentUseremail: any;
  companyIds: any = [];
  roles: any = [];
  readOnly = true;
  roleReadOnly: any = true;
  mailReadOnly = false;

  get isValid(): boolean { return this.form.controls[this.inputControl.key].valid; }
  get isTouched(): boolean { return this.form.controls[this.inputControl.key].touched; }
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedChipValues: any[] = [];
  hide = true;
  userPageReset: Subscription | any;
  // currentFileUpload: FileUpload | any;
  percentage: number | any;

  constructor ( public roleservice: RoleService,) {}
  // constructor(private navigationService: NavigationService,
    // public roleservice: RoleService,
    // private companyCreationService: CompanyCreationService,
    // public uploadService: UploadFileService,
    // public contractService: ContractService, public userdetailsService: UserdetailsService,
    // public utilityService: UtilityService,
    // public authService: AuthService, private spinner: NgxSpinnerService) {
  // }

  ngOnInit(): void {
    this.firstNameprefix = ['Mr', 'Ms'];
    // this.authService.setFormValueChanges(false);
    // this.authService.setEditFormValueChanges(false);
    // this.contractService.setFormValueChanges(false);
    // if (this.inputControl.key == 'contryCode') {
      // this.utilityService.countryCode().subscribe((data: any) => {
        // this.contryCode = data;
      // });
    // }
    // this.roleservice.getrolesNameList().subscribe((data: any) => {
      // this.roleList = data;
    // });
    // this.companyCreationService.getcompanyNameList().subscribe((data: any) => {
      // this.companyList = data;
    // });
  }

  selectedOptionValue(currency: any, key: any) {
    if (key === 'currency') {
      // this.contractService.setCurrency(currency);
    }
  }

  removeFile(f: any) {
    this.fileUpload.nativeElement.value = "";
    this.file = '';
    this.uploadedFile.emit(this.file);
    // this.uploadService.setUploadUrls('');
    // this.uploadService.setUploadFiles('');
    // this.authService.setEditFormValueChanges(true);
  }

  selectFile(event: any) {
    this.file = event.target.files[0];
    this.uploadedFile.emit(this.file);
    // this.uploadService.uploadedPOFileUrl.next(null);
  }

  onClick() {
    if (this.fileUpload) this.fileUpload.nativeElement.click();
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls[this.inputControl.key] }


  ngOnChanges() {
    this.userPageReset = this.roleservice.userPageReset$.subscribe((resetData: any) => {
      this.reset = resetData;
    });

    this.form.valueChanges.subscribe((data: any) => {
      if (this.form.dirty && this.form.touched) {
        // this.authService.setFormValueChanges(true);
      }
      if (data.email != '' && data.firstName == '' && data.lastName == '' && data.contact == ''
        && data.address == '' && data.designation == '' && data.companyDetail == '' && data.role == '') {
        // this.authService.setFormValueChanges(false);
      }
    });
  }

  notNull(data: any) {
    return data !== undefined && data !== null && data !== "";
  }

  ngModelChange(value: any, key: any) {
    if (key == 'contractRefNo' || key == 'vendor_Customer_Name' || key == 'deliveryTerm' || key == 'paymentTerm') {
      this.form.controls[key].valueChanges.pipe(() => {
        // return this.contractService.getContractList();
      }).subscribe((contractList: any) => {
        this.contractList = contractList;
        this.filterArray(value, this.contractList.map((x: any) => x[key]), key);
      });
    }
    switch (key) {
      case 'role':
        this.filterArray(value, this.roleList);
        break;
      case 'company':
        this.filterArray(value, this.companyList);
        break;
    }
  }

  filterArray(value: string, autoCompleteArray: any[], key?: any) {
    if (value) {
      if (value.length >= 1 && !key) {
        this.filteredOption = autoCompleteArray
          .filter((option: string) => option.toLowerCase().indexOf(value.toLowerCase()) === 0);
      }
      else if (value.length >= 1 && key) {
        switch (this.inputControl.key) {
          case 'contractRefNo':
            this.duplicateFlag = _.some(this.contractList, { 'contractRefNo': value });
            break;
          case 'vendor_Customer_Name':
            this.duplicateFlag = _.some(this.contractList, { 'vendor_Customer_Name': value });
            break;
          case 'deliveryTerm':
            this.duplicateFlag = _.some(this.contractList, { 'deliveryTerm': value });
            break;
          case 'paymentTerm':
            this.duplicateFlag = _.some(this.contractList, { 'paymentTerm': value });
            break;
        }
        this.filteredOption = autoCompleteArray
          .filter((option: any) => option.toLowerCase().indexOf(value.toLowerCase()) === 0);
      }
      else {
        this.filteredOption = [];
      }
    }
    else {
      this.filteredOption = [];
    }
  }

  getUserSelectedValue(selectedValue: any) {
    switch (this.inputControl.key) {
      case 'contractRefNo':
        this.duplicateFlag = _.some(this.contractList, { 'contractRefNo': selectedValue.option.value });
        break;
      case 'vendor_Customer_Name':
        this.duplicateFlag = _.some(this.contractList, { 'vendor_Customer_Name': selectedValue.option.value });
        break;
      case 'deliveryTerm':
        this.duplicateFlag = _.some(this.contractList, { 'deliveryTerm': selectedValue.option.value });
        break;
      case 'paymentTerm':
        this.duplicateFlag = _.some(this.contractList, { 'paymentTerm': selectedValue.option.value });
        break;
    }
    // if (this.inputControl.key == 'company') {
      // this.companyCreationService.getCompany(selectedValue.option.value).subscribe((companyId: any) => {
        // this.form.controls['cid'].value = companyId[0].id;
      // });
    // }
  }

  //display the filtered value in textarea
  getUserOptionText(option: any): any {
    if (option != null) {
      return option;
    }
  }

  checkboxRule(event: AbstractControl, inputControl: { key: string | number; rule: { toggleenable: any[]; toggleclear: any[]; }; }): void {
    event ? this.form.controls[inputControl.key].setValue(true) : this.form.controls[inputControl.key].setValue(false);
    if (inputControl.rule) {
      if (inputControl.rule.toggleenable && inputControl.rule.toggleenable.length > 0) {
        inputControl.rule.toggleenable.forEach((item: string | number) => {
          event ?
            this.form.controls[item].enable() : this.form.controls[item].disable();
        })
      }
      if (inputControl.rule.toggleclear && inputControl.rule.toggleclear.length > 0) {
        inputControl.rule.toggleclear.forEach((item: string | number) => {
          if (event) { }
          else {
            this.form.controls[item].setValue(null);
            this.form.controls[item].reset();
          }
        })
      }
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    const selectedValue = this.filteredOption.filter((option: string | string[]) => option.indexOf(value) === 0);
    // Add value
    if ((value || '').trim()) {
      if (selectedValue[0] == event.value) {
        const temp_SelectedValue = this.selectedChipValues.filter(option => option.indexOf(event.value) === 0);
        if (temp_SelectedValue.length == 0) {
          this.selectedChipValues.push(value.trim());
          this.form.controls[this.inputControl.key].setValue(this.selectedChipValues);
          this.selectedArrayValues.setValue('');
        }
      }
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.selectedArrayValues.setValue('');
  }

  remove(option: string): void {
    const index = this.selectedChipValues.indexOf(option);
    if (index >= 0) {
      this.selectedChipValues.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    const selectedValue = this.filteredOption.filter((option: string | string[]) => option.indexOf(value) === 0);
    // Add value
    if ((value || '').trim()) {
      if (selectedValue[0] == event.option.viewValue) {
        const temp_SelectedValue = this.selectedChipValues.filter(option => option.indexOf(event.option.viewValue) === 0);
        if (temp_SelectedValue.length == 0) {
          this.selectedChipValues.push(value.trim());
          this.form.controls[this.inputControl.key].setValue(this.selectedChipValues);
          this.selectedArrayValues.setValue('');
        }
      }
    }
    this.selectedArrayValues.setValue('');
  }

  InputControl(event: any, key: any) {
    setTimeout(() => {
      let isValueTrue = this.filteredOption.filter((myAlias: any) =>
        myAlias === event.target.value);
      if (isValueTrue.length === 0) {
        this.form.get(key).setValue(null);
      }
    }, 300);
  }

  ngOnDestroy() {
    this.userPageReset.unsubscribe();
  }
}
