import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Router, ActivatedRoute } from "@angular/router";
import { MessageService } from 'primeng/api';
import { NgForm, FormControl, FormGroup } from '@angular/forms';
import { RentalService } from 'src/app/services/rental.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-rental',
  templateUrl: './add-rental.component.html',
  styleUrls: ['./add-rental.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})

export class AddRentalComponent implements OnInit {
  username: string = '';

  id: string = "";
  rentalForm = {
    id: '',
    firstName: '',
    lastName: '',
    roomsAvailable: '',
    bedrooms: '',
    bathrooms: '',
    amenities: '',
    price: '',
    description: '',
    address1: '',
    city: '',
    state: '',
    zipCode: '',
    email: '',
    phone: '',
    images: new Array<any>()
  };

  uploadedFiles: any[] = [];
  uploadMaxFileSize = 1000000;

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private _rentalService: RentalService,
    private storage: AngularFireStorage,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.id = this.route.snapshot.paramMap.get('id') as string;
  }

  saveForm() {
    console.log("listForm: ", this.rentalForm);
    let dateStamp = new Date();
    // listForm[created_on] = dateStamp;
    this._rentalService.addApart(this.rentalForm);
    this.router.navigate(["/"]);
  }

  clearForm() {
    this.rentalForm = {
      id: '',
      firstName: '',
      lastName: '',
      roomsAvailable: '',
      bedrooms: '',
      bathrooms: '',
      amenities: '',
      price: '',
      description: '',
      address1: '',
      city: '',
      state: '',
      zipCode: '',
      email: '',
      phone: '',
      images: new Array<any>()
    };
  }

  cancelForm() {
    this.clearForm();
    this.router.navigate(["list-vacancies"]);
  }

  onUpload(event: any, imageForm: any) {

    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    for (let file of this.uploadedFiles) {
      let filePath = `${'rentalImages'}/${file.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);

      this.storage.upload(filePath, file).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.rentalForm.images.push(url);
          })
        })
      ).subscribe();
    }

    imageForm.clear();
    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }
}
