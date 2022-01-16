import { Component, OnInit } from '@angular/core';
import { Role, RoleId, RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {
  showButton: any;
  roles: any;
  role: Role = this.resetPage();
  actions: string | any;
  inputControls = this.getInputs(this.role);
  accordion: any;


  constructor(public roleservice: RoleService) { }

  resetPage() {
    this.actions = "Add";
    return <Role> { rolename: '', level: '',  position:0 ,name:'',city:'',role:'',salary:0 };
  }

  showToggleBtn() {
    this.showButton = !this.showButton;
  }

  ngOnInit(): void {
  }
  
  handleFormSubmit(data: any): void {
    console.log(data)
  }
  handleTableEvent(eventData: any): void {
    if (eventData.eventName === 'edit-action') {
      this.handleEdit(eventData.data);
    }
  }
  handleEdit(roleData: any): void {
    this.actions = "Edit";
    this.role = { ...roleData };
    this.inputControls = this.getInputs(this.role);
    this.showButton = true;
    this.accordion.openAll();
    this.scrollToTop();
  }
  scrollToTop() {
    throw new Error('Method not implemented.');
  }

  getInputs(role: Role): any {
    const data = [
      {
        controlType: 'textbox',
        key: 'id',
        label: 'Name',
        type: 'text',
        order: 1,
        cssClass: 'col-3'
      }, {
        controlType: 'textbox',
        key: 'rolename',
        label: 'Role',
        type: 'text',
        order: 2,
        cssClass: 'col-3'
      }, 
      {
        controlType: 'textbox',
        key: 'icon',
        label: 'Icon',
        type: 'text',
        order: 4,
        cssClass: 'col-3'
      }, {
        controlType: 'textbox',
        key: 'link',
        label: 'Link',
        type: 'text',
        order: 5,
        cssClass: 'col-3'
      }, {
        controlType: 'textbox',
        key: 'order',
        label: 'Order',
        type: 'number',
        order: 6,
        cssClass: 'col-3'  
      }, {
        controlType: 'textbox',
        Key: 'password',
        label: 'Enter Password',
        type: 'password',
        order: 9,
        cssClass: 'col-3'
      }, {
        controlType: 'checkbox',
        key: 'checkbox',
        label: 'Agree',
        type: 'checkbox',
        order: 10,
      },
    ];
    return (data)
  }
}
