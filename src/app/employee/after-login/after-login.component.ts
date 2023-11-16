import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.css']
})
export class AfterLoginComponent implements OnInit {

  constructor(private firebaseService : FirebaseService, private router : Router) { }

  ngOnInit(): void {
  }

  async logout() {
    await this.firebaseService.logout();
    if(!FirebaseService.isEmpLoggedIn){
      this.router.navigate(['employee/login']);
    }
  }

}
