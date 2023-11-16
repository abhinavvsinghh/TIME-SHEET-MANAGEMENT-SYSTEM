import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthManagerGuard } from '../services/auth-manager.guard';
import { MloginComponent } from './mlogin/mlogin.component';
import { RecordsComponent } from './records/records.component';

const routes: Routes = [{
  path:'manager', children: [
    {path:'records',component:RecordsComponent, canActivate: [AuthManagerGuard]},
    {path:'login',component:MloginComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
