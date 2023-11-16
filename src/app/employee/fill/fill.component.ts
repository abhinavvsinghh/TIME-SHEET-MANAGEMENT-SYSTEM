import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Timesheet from 'src/app/models/timesheet.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-fill',
  templateUrl: './fill.component.html',
  styleUrls: ['./fill.component.css']
})
export class FillComponent implements OnInit {

  timesheet: Timesheet = new Timesheet();
  submitted = false;
  typeLeave = false;
  textBoxDisabled = true;

  constructor(private firebaseService : FirebaseService, private firestoreService : FirestoreService, private router : Router) { }

  timeSheetForm = new FormGroup({
    type : new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    email: new FormControl(localStorage.getItem('user'), Validators.required)
  });

  ngOnInit(): void {

  }

  toggle(data: string){
    console.log(data);
    if (data === 'Leave') {
      this.timeSheetForm.get('date')?.disable();
      this.timeSheetForm.get('startTime')?.disable();
      this.timeSheetForm.get('endTime')?.disable();
      this.timeSheetForm.get('description')?.disable();
      this.submitted = true;
      this.typeLeave = true;
  } else {
    this.timeSheetForm.get('date')?.enable();
    this.timeSheetForm.get('startTime')?.enable();
    this.timeSheetForm.get('endTime')?.enable();
    this.timeSheetForm.get('description')?.enable();
    this.submitted = false;
    this.typeLeave = false;
  }
  }

  submit() {
    this.timesheet.type = this.timeSheetForm.value.type;
    this.timesheet.date = this.timeSheetForm.value.date;
    this.timesheet.startTime = this.timeSheetForm.value.startTime;
    this.timesheet.endTime = this.timeSheetForm.value.endTime;
    this.timesheet.description = this.timeSheetForm.value.description;
    this.timesheet.status = 'In-Process';
    this.timesheet.email = this.timeSheetForm.value.email;

    this.firestoreService.create(this.timesheet).then(() => {
      console.log('Added new timesheet data successfully!');
      this.submitted = true;
    })
  }

  reset() {
    this.submitted = false;
    this.timeSheetForm.setValue({
      type : '',
      date: '',
      startTime: '',
      endTime: '',
      description: '',
      email: ''      
    });
    this.timesheet = new Timesheet();
  }

  leave() {
    window.location.href = 'https://outlook.office365.com/mail/';
  }

  back() {
    this.router.navigate(['employee/home']);
  }

  view() {
    this.router.navigate(['employee/home/view']);
  }

  async logout() {
    await this.firebaseService.logout();
    if(!FirebaseService.isEmpLoggedIn){
      this.router.navigate(['employee/login']);
    }
  }

}
