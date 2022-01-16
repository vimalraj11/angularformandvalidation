import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Role, RoleId, RoleService } from 'src/app/services/role.service';
import { BehaviorSubject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
// import { ELEMENT_DATA, PeriodicElement } from '../table-details';
import { MatAccordion } from '@angular/material/expansion';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-mat-data-table',
  templateUrl: './mat-data-table.component.html',
  styleUrls: ['./mat-data-table.component.css']
})
export class MatDataTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'role', 'city', 'salary', 'actions'];
  dataSource = [
    { position: 1, name: 'Anbu', role: 'Full-Stack', city: 'Madurai', salary: 10079 },
    { position: 2, name: 'Vimal', role: 'Developer', city: 'Paramakudi', salary: 30026 },
    { position: 3, name: 'Suriya', role: 'Fornt-End', city: 'Sukkampatty', salary: 2941 },
    { position: 4, name: 'Yokesh', role: 'Accountant', city: 'kumbam', salary: 30122 },
    { position: 5, name: 'Vishakan', role: 'Marketing', city: 'Theni', salary: 1811 },
    { position: 6, name: 'Sanju', role: 'Sales', city: 'Karur', salary: 2107 },
    { position: 7, name: 'Feras', role: 'Back-End', city: 'Madurai', salary: 3067 },
    { position: 8, name: 'Sriram', role: 'Developer', city: 'Karur', salary: 5994 },
    { position: 9, name: 'Prasanth', role: 'Accountant', city: 'Paramkudi', salary: 1984, },
    { position: 10, name: 'Raju', role: 'Sales', city: 'pramakudi', salary: 2797 },
  ];
  columnNames = Object.keys(this.dataSource[0]);

  capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  userPageReset: BehaviorSubject<any> = new BehaviorSubject(null);
  public userPageReset$ = this.userPageReset.asObservable();
  showButton: any;
  roles: any;
  role: Role = this.resetPage();
  actions: string | any;
  inputControls = this.getInputs(this.role);
  form: any;
  @ViewChild(MatAccordion) accordion: MatAccordion | any;

  constructor(public roleservice: RoleService) { }

  resetPage() {
    this.actions = "Add";
    return <Role>{ rolename: '', level: '', position: 0, name: '', city: '', role: '', salary: 0 };
  }

  getInputs(role: Role): any {
    const data = [
      {
        controlType: 'textbox',
        key: 'id',
        label: 'No',
        type: 'number',
        value: role.position,
        order: 1,
        cssClass: 'col-3'
      }, {
        controlType: 'textbox',
        key: 'rolename',
        label: 'Name',
        type: 'text',
        value: role.name,
        order: 2,
        cssClass: 'col-3'
      },
      {
        controlType: 'textbox',
        key: 'role',
        label: 'Role',
        type: 'text',
        value: role.role,
        order: 3,
        cssClass: 'col-3'
      }, {
        controlType: 'textbox',
        key: 'city',
        label: 'City',
        type: 'text',
        value: role.city,
        order: 4,
        cssClass: 'col-3'
      }, {
        controlType: 'textbox',
        key: 'order',
        label: 'Salary',
        type: 'number',
        value: role.salary,
        order: 5,
        cssClass: 'col-3'
      },
    ];
    return (data)
  }

  showToggleBtn() {
    this.showButton = this.showButton;
  }


  handleFormSubmit(data: any): void {
    console.log(data)
  }

  handleEdit(roleData: any): void {
    this.actions = "Edit";
    this.role = { ...roleData };
    this.inputControls = this.getInputs(this.role);
    this.showButton = true;
    this.accordion.openAll();
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
    this.handleEdit(eventData);
  }

  public setReset(reset: any): void {
    this.userPageReset.next(reset);
  }

  ngAfterViewInit() {
  }
}