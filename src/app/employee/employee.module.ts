import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';
import { LoginComponent } from './login/login.component';
import { EmpHomeComponent } from './emp-home/emp-home.component';
import { SignupComponent } from './signup/signup.component';
import { FillComponent } from './fill/fill.component';
import { ViewComponent } from './view/view.component';
import { AfterLoginComponent } from './after-login/after-login.component';
import { PhoneComponent } from './phone/phone.component';


@NgModule({
  declarations: [
    LoginComponent,
    EmpHomeComponent,
    SignupComponent,
    FillComponent,
    ViewComponent,
    AfterLoginComponent,
    PhoneComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class EmployeeModule { }
