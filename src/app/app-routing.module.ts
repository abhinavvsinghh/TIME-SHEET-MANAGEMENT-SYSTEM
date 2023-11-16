import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpHomeComponent } from './employee/emp-home/emp-home.component';
import { HomeComponent } from './home/home.component';
import { MloginComponent } from './manager/mlogin/mlogin.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'employee', component:EmpHomeComponent},
  {path:'manager', component:MloginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
