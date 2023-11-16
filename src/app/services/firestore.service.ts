import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import Timesheet from '../models/timesheet.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private dbPath = '/timeSheetData';
  timeSheetRef!: AngularFirestoreCollection<Timesheet>;

  constructor(public db: AngularFirestore) {
    this.timeSheetRef = db.collection(this.dbPath);
  }

  create(timesheet: Timesheet): any {
    return this.timeSheetRef.add({...timesheet})
  }

  getAll() : AngularFirestoreCollection<Timesheet> {
    return this.timeSheetRef;
  }

  filterByStatus(status : string) {
    return this.db.collection("timeSheetData",ref=>ref.where('status', '==' , status)).get();
  }

  filterByEmail(email : any) {
    return this.db.collection("timeSheetData",ref=>ref.where('email', '==' , email)).get();
  }

  update(id: string, data: any): Promise<void> {
    return this.timeSheetRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.timeSheetRef.doc(id).delete();
  }
}
