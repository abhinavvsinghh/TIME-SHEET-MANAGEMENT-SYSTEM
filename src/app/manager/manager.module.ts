import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { MloginComponent } from './mlogin/mlogin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecordsComponent } from './records/records.component';


@NgModule({
  declarations: [
    MloginComponent,
    RecordsComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class ManagerModule { }
