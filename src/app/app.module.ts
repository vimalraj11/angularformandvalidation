import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SigninComponent } from './component/signin/signin.component';
import { LoginComponent } from './component/login/login.component';
import { LayoutComponent } from './component/layout/layout.component';
import { UserService } from './services/user.service';
import { AppService } from './component/layout/app.services';
import { HelloComponent } from './component/layout/hello.component';
import { TestComponent } from './component/test/test.component';
import { LodashComponent } from './component/lodash/lodash.component';
import { Test1Component } from './component/test1/test1.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentdetailsComponent } from './component/studentdetails/studentdetails.component';
import { AngularMaterialModule } from './material-module';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormComponent } from './component/shared/dynamic-form/dynamic-form.component';
import { DynamicFormControlComponent } from './component/shared/dynamic-form-control/dynamic-form-control.component';
import { TestFormComponent } from './component/test-form/test-form.component';
import { RoleService } from './services/role.service';
import { MatDataTableComponent } from './component/curd-operation/mat-data-table/mat-data-table.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    LoginComponent,
    LayoutComponent,
    HelloComponent,
    TestComponent,
    LodashComponent,
    Test1Component,
    StudentdetailsComponent,
    DynamicFormComponent,
    DynamicFormControlComponent,
    TestFormComponent,
    MatDataTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    MatNativeDateModule,
    BrowserAnimationsModule
  ],
  providers: [UserService,AppService, RoleService,],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class AppModule { }
