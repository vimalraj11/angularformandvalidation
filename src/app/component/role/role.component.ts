import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { RoleService, RoleId } from 'src/app/services/role.service';
import { DynamicBase } from 'src/app/dynamic-controls/dynamic-base';
import { TableConfig } from 'src/app/models/table-config';
import * as _ from 'lodash';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { CompanyCreationService } from 'src/app/services/company-creation.service';
import { ContractService } from 'src/app/services/contract.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAccordion } from '@angular/material/expansion';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})

export class RoleComponent implements OnInit {
  roles: any;
  role: RoleId = this.resetPage();
  formChangesValue = false;
  @ViewChild(MatAccordion) accordion: MatAccordion | any;

  public columns: any;
  public tableConfig: TableConfig | any;
  actions: string | any;
  userRole: any;
  inputControls = this.getInputs(this.role);
  showButton: any;

  constructor(private roleService: RoleService,
    private authService: AuthService, public contractService: ContractService,
    private companyCreationService: CompanyCreationService,
    private _snackBar: MatSnackBar, public roleservice: RoleService) {
    this.roles = this.roleService.$roles;
  }

  canDeactivate(): Observable<boolean> | boolean {
    return this.formChangesValue;
  }

  @HostListener('window:beforeunload', ['$event'])
  windowBeforeunload($event: any) {
    if (this.canDeactivate()) {
      $event.returnValue = true;
    }
  }

  resetPage(): RoleId {
    this.actions = "Add";
    return { rolename: '', level: '', id: '' };
  }

  showToggleBtn() {
    this.showButton = !this.showButton;
  }

  ngOnInit(): void {
    this.roleservice.setReset(true);
    this.authService.getFormValueChanges$.subscribe((data: any) => {
      this.formChangesValue = data;
    });

    this.actions = "Add";

    this.columns = {
      mobile: [{
        title: 'Role List',
        field: [
          { title: 'Role', field: 'rolename' },
          { title: 'Level', field: 'level' },
        ],
        sortable: true,
        responsiveFlag: true,
        responsiveTitle: 'Role List'
      }],
      desktop: [
        {
          title: 'Role',
          field: 'rolename',
          sortable: true
        },
        {
          title: 'Level',
          field: 'level',
          sortable: true
        },
        // {
        //   title: 'User Name',
        //   field: 'firstName',
        //   sortable: true
        // },
        // {
        //   title: 'Email id',
        //   field: 'email',
        //   sortable: true
        // }
      ]
    };

    this.tableConfig = <TableConfig>({
      actions: {
        edit: true,
        open: false,
        delete: false,
        sortable: false
      }
    });
  }

  handleFormSubmit(data: any): void {
    this.roleservice.setReset(true);
    if (data.form.id !== null && data.form.id !== '') {
      this.roleService.updateRole(data.form);
      this.authService.setFormValueChanges(false);
    }
    else {
      this.roleService.addRole(data.form);
      this.authService.setFormValueChanges(false);
    }
    this.role = this.resetPage();
    this.inputControls = this.getInputs(this.role);
  }

  handleEdit(roleData: any): void {
    this.actions = "Edit";
    this.role = { ...roleData };
    this.inputControls = this.getInputs(this.role);
    this.roleservice.setReset(false);
    this.showButton = true;
    this.accordion.openAll();
    this.scrollToTop();
  }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }

  handleTableEvent(eventData: any): void {
    if (eventData.eventName === 'edit-action') {
      this.handleEdit(eventData.data);
    }
  }

  getInputs(role: RoleId): any {
    const data = [
      {
        controlType: 'textbox',
        key: 'id',
        label: '',
        value: role.id,
        type: 'hidden',
        order: 1,
        cssClass: 'col-6'
      }, {
        controlType: 'textbox',
        key: 'rolename',
        label: 'Role',
        type: 'text',
        required: true,
        value: role.rolename,
        order: 2,
        cssClass: 'col-3'
      }, {
        controlType: 'dropdown',
        key: 'level',
        label: 'Level',
        required: true,
        value: role.level,
        type: 'dropdown',
        order: 3,
        cssClass: 'col-3'
      },
      // {
      //   controlType: 'textbox',
      //   key: 'firstName',
      //   label: 'User Name',
      //   required: true,
      //   value: role.firstName,
      //   type: 'text',
      //   order: 3,
      //   cssClass: 'col-3'
      // },
      // {
      //   controlType: 'textbox',
      //   key: 'email',
      //   label: 'Email id',
      //   required: true,
      //   value: role.email,
      //   type: 'text',
      //   order: 3,
      //   cssClass: 'col-3',
      //   isReadonly: false
      // }
    ];
    return _(data).map((item: any) => new DynamicBase<string>(item)).sort((a: any, b: any) => a.order - b.order).value();
  }
}

