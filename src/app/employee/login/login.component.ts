import { Component, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

export class PhoneNumber {
  country!: string;
  area!: string;
  prefix!: string;
  line!: string;
  get e164() {
    const num = this.country + this.area + this.prefix + this.line
    return `+${num}`
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errMsgShow: any;
  errMsg : any;
  windowRef: any;


  constructor(private firebaseService: FirebaseService, private router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  async login() {
    await this.firebaseService.signin(this.loginForm.value.email,this.loginForm.value.password);
    if(FirebaseService.isEmpLoggedIn){
      this.router.navigate(['employee/home']);
    } else {
      this.errMsgShow = true;
      this.errMsg = '*something went wrong!';
    }
  }

  async signInWithGoogle() {
    await this.firebaseService.googleSignIn();
    if(FirebaseService.isEmpLoggedIn){
      this.router.navigate(['employee/home']);
    } else {
      this.errMsgShow = true;
      this.errMsg = FirebaseService.errorMessage;
    }
  }

  // back
  back() {
    this.router.navigate(['/employee']);
  }

  phone() {
    this.router.navigate(['employee/phone']);
  }

}
