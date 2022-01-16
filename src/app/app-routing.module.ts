import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './component/signin/signin.component';
import { LoginComponent } from './component/login/login.component';
import { LayoutComponent } from './component/layout/layout.component';
import { TestComponent } from './component/test/test.component';
import { LodashComponent } from './component/lodash/lodash.component';
import { Test1Component } from './component/test1/test1.component';
import { StudentdetailsComponent } from './component/studentdetails/studentdetails.component';
import { TestFormComponent } from './component/test-form/test-form.component';
import { MatDataTableComponent } from './component/curd-operation/mat-data-table/mat-data-table.component';

const routes: Routes = [
  {
    path :'', component: SigninComponent
  },
  {
    path :'login', component: LoginComponent 
  },
  {
    path : 'layout', component : LayoutComponent
  },
  {
    path: 'test', component : TestComponent
  },
  {
    path : 'lodash', component : LodashComponent
  },
  {
    path : 'test1' , component : Test1Component
  },
  {
    path : 'studentdetails' , component : StudentdetailsComponent
  },
  {
    path : 'testform' , component : TestFormComponent
  },{
    path : 'matdatatable' , component : MatDataTableComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
