import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-mlogin',
  templateUrl: './mlogin.component.html',
  styleUrls: ['./mlogin.component.css']
})
export class MloginComponent implements OnInit {

  errMsgShow: any;
  errMsg : any;

  constructor(private firebaseService: FirebaseService, private router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
  }

  async login() {
    await this.firebaseService.msignin(this.loginForm.value.email,this.loginForm.value.password);
    if(FirebaseService.isManLoggedIn){
      this.router.navigate(['manager/records']);
    } else {
      this.errMsgShow = true;
      this.errMsg = '*invalid!';
    }
  }

  // back
  back() {
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
