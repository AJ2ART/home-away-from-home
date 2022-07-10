import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { RentalFormHelper } from 'src/app/models/rental-form-helper';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private afs: AngularFirestore) { }
  getLists(): Observable<RentalFormHelper[]> {
    // return this.afs.collection<RentalFormHelper>("RentalFormHelper").valueChanges()
    return this.afs.collection<RentalFormHelper>("RentalForms")
      .snapshotChanges()
      .pipe(
        map((changes: any) => changes.map((c: any) =>
        (
          {
            id: c.payload.doc.id,
            ...c.payload.doc.data()
          }
        )
        ))
      );
  }
  getList(id: string): Observable<RentalFormHelper> {
    // return this.afs.doc<RentalFormHelper>('lists/${id}')
    return this.afs.collection("RentalForms").doc(id)
      .snapshotChanges()
      .pipe(
        map((action: any) => {
          if (action.payload.exists === false) {
            return new Object as RentalFormHelper

          } else {
            const data = action.payload.data() as RentalFormHelper;
            data.id = action.payload.id;
            return data;
          }
        })
      )

  }
  addApart(RentalForm: RentalFormHelper): void {
    this.afs.collection<RentalFormHelper>("RentalForms").add(RentalForm);
  }

  updateList(RentalForm: RentalFormHelper, RentalFormId: string): void {
    this.afs.collection<RentalFormHelper>("RentalForms").doc(RentalFormId).update(RentalForm);
  }

  deleteList(RentalFormId: string): void {
    //this.afs.doc<RentalFormHelper>('RentalFormHelper/${listId}').delete();
    this.afs.collection<RentalFormHelper>("RentalFormId").doc(RentalFormId).delete();
  }

}
