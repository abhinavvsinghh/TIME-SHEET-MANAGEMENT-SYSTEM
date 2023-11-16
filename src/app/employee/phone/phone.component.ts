import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {
  constructor(private router: Router, public auth: AngularFireAuth) {

  }

  ngOnInit(): void {
    this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible'
      }
    );
  }

  reCaptchaVerifier!: any;
  number = '';
  wrong = false;
  phoneNumber:any;

  otp = false;
  code = '';
  id = '';
  phone() {
    if (this.number[0] == '+' && this.number.length == 13) {
    }
    else if (this.number.length == 10) {
      this.number = '+91' + this.number;
    }
    else {
      this.wrong = true;
      return;
    }
    this.close3();
    this.auth.signInWithPhoneNumber(this.number, this.reCaptchaVerifier)
      .then(id => {
        console.log(id,"user2");
        this.otp = true;
        this.id = id.verificationId;
      }).catch(err => {
        console.log(err);
      })
  }

  phone2() {
    const credentials = firebase.auth.PhoneAuthProvider.credential(this.id, this.code);
    firebase.auth().signInWithCredential(credentials)
      .then(res => {
        if (res) {
          FirebaseService.isEmpLoggedIn = true;
          this.phoneNumber = res.user?.phoneNumber;
          localStorage.setItem('user',this.phoneNumber);
          this.otp = false;
          this.code = '';
          this.number = '';
          this.close4();
          if (FirebaseService.isEmpLoggedIn) {
            this.router.navigate(['employee/home']);
          }
        }

      })
  }
  close3() {
    this.wrong = false;
  }
  close4() {
    this.otp = false;
  }
}
