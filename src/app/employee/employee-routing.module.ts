import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../services/auth-guard.guard';
import { AfterLoginComponent } from './after-login/after-login.component';
import { FillComponent } from './fill/fill.component';
import { LoginComponent } from './login/login.component';
import { PhoneComponent } from './phone/phone.component';
import { SignupComponent } from './signup/signup.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: 'employee',
    children: [
      { path: 'signup', component: SignupComponent },
      { path: 'login', component: LoginComponent },
      { path: 'phone', component: PhoneComponent },
      { path: 'home', component: AfterLoginComponent},
      { path: 'home/fill', component: FillComponent,canActivate: [AuthGuardGuard] },
      { path: 'home/view', component: ViewComponent,canActivate: [AuthGuardGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
