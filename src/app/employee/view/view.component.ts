import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import Timesheet from 'src/app/models/timesheet.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {


  msgShow = false;
  msg : any;
  size : any;
  timesheet?: Timesheet[];
  timesheetArr = new Array();

  constructor(private firebaseService : FirebaseService, private firestoreService : FirestoreService, private router : Router) { }

  ngOnInit(): void {
    this.getAllData();
  }

  // getAllData(): void {
  //   this.firestoreService.getAll().snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c =>
  //         ({ id: c.payload.doc.id, ...c.payload.doc.data() })
  //       )
  //     )
  //   ).subscribe(data => {
  //     this.timesheet = data;
  //     this.size = data.length;
  //     console.log(this.timesheet);
  //   });
  // }

  getAllData() {
    this.firestoreService.filterByEmail(localStorage.getItem('user')).subscribe((data) => {
      data.forEach((childDoc) => {
        this.timesheetArr.push(childDoc.data());
      });
      this.timesheet = this.timesheetArr;
      this.size = this.timesheetArr.length;
      console.log(this.timesheet);

    });
  }

  back() {
    this.router.navigate(['employee/home']);
  }

  fill() {
    this.router.navigate(['employee/home/fill']);
  }

  async logout() {
    await this.firebaseService.logout();
    if(!FirebaseService.isEmpLoggedIn){
      this.router.navigate(['employee/login']);
    }
  }

}
