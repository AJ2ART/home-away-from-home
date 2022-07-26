import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor(private afs: AngularFirestore) { }
    addQuery(RentalForm: any): void {
        this.afs.collection<any>("ContactForms").add(RentalForm);
    }


}
