import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errMsgShow: any;
  errMsg : any;

  constructor(private firebaseService: FirebaseService, private router: Router) { }

  signupForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  async signup() {
    await this.firebaseService.signup(this.signupForm.value.email,this.signupForm.value.password);
    if(FirebaseService.isEmpLoggedIn){
      this.router.navigate(['employee/login']);
    } else {
      this.errMsgShow = true;
      this.errMsg = FirebaseService.errorMessage;
    }
  }

  // back
  back() {
    this.router.navigate(['/employee']);
  }
}
