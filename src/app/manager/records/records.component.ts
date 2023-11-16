import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import Timesheet from 'src/app/models/timesheet.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
})

export class RecordsComponent implements OnInit {

  msgShow = false;
  msg: any;
  size: any;
  id: any;
  timesheet?: Timesheet[];
  timesheetArr = new Array();


  constructor(
    private firebaseService: FirebaseService,
    private firestoreService: FirestoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }

  // getAllData() {
  //   this.firestoreService.filter('In-Process').subscribe((data) => {
  //     data.forEach((childDoc) => {
  //       var obj = childDoc.data();
  //       if (obj) {
  //         Object.assign(obj, { id: childDoc.id });
  //       }
  //       this.timesheetArr.push(obj);
  //     });
  //     this.timesheet = this.timesheetArr;
  //     this.size = this.timesheetArr.length;
  //     console.log(this.timesheet);

  //   });
  // }

  getAllData(): void {
    this.firestoreService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.timesheet = data;
      this.size = data.length;
    });
  }

  update(id: any, data: string) {
    this.firestoreService.update(id, { 'status': data });
  }

  async logout() {
    await this.firebaseService.mlogout();
    if (!FirebaseService.isManLoggedIn) {
      this.router.navigate(['manager/login']);
    }
  }
}
