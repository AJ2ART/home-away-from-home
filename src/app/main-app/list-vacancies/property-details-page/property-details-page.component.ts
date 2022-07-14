import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Router, ActivatedRoute } from "@angular/router";
import { MessageService } from 'primeng/api';
import { NgForm, FormControl, FormGroup } from '@angular/forms';
import { RentalService } from 'src/app/services/rental.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-property-details-page',
  templateUrl: './property-details-page.component.html',
  styleUrls: ['./property-details-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class PropertyDetailsPageComponent implements OnInit {

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
  originalCopy: any;
  carousalData: Array<any> = [];

  uploadedFiles: any[] = [];
  uploadMaxFileSize = 1000000;
  editMode: boolean = false;

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
    if (this.id) {
      this._rentalService.getList(this.id).subscribe(p => {
        this.rentalForm = p;
        this.originalCopy = p;

        this.formatCarouselData(this.rentalForm.images); 
      });
    }
  }

  formatCarouselData(images: any) {
    this.carousalData = [];
    for(let img of images) {
      this.carousalData.push({
        "previewImageSrc": img,
        "thumbnailImageSrc": img,
      })
    }
  }
  
  resetForm() {
    // set to original values
    this.rentalForm = {
      id: this.originalCopy.id,
      firstName: this.originalCopy.firstName,
      lastName: this.originalCopy.lastName,
      roomsAvailable: this.originalCopy.roomsAvailable,
      bedrooms: this.originalCopy.bedrooms,
      bathrooms: this.originalCopy.bathrooms,
      amenities: this.originalCopy.amenities,
      price: this.originalCopy.price,
      description: this.originalCopy.description,
      address1: this.originalCopy.address1,
      city: this.originalCopy.city,
      state: this.originalCopy.state,
      zipCode: this.originalCopy.zipCode,
      email: this.originalCopy.email,
      phone: this.originalCopy.phone,
      images: new Array<any>()
    };
  }

  enableEditForm() {
    this.editMode = true;
  }

  cancelForm() {
    this.resetForm();
    this.editMode = false;
  }

  navBack() {
    this.router.navigate(["/list-vacancies"]);
  }

  updateForm() {
    this._rentalService.updateList(this.rentalForm, this.id);
    this.messageService.add({ severity: 'success', summary: 'Rental Property Updated!', detail: '' });
  }

  deleteForm() {
    if (confirm("Are you sure you want to delete?")) {
      this._rentalService.deleteList(this.id);
      this.messageService.add({ severity: 'success', summary: 'Rental Property Deleted!', detail: '' });
      this.router.navigate(["/list-vacancies"]);
    }
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
            this.uploadedFiles.length = 0;
          })
        })
      ).subscribe();
    }

    imageForm.clear();
    this.messageService.add({ severity: 'info', summary: 'Images Uploaded', detail: '' });
  }

  deleteImg(imgURL: any) {
    this.storage.refFromURL(imgURL).delete();
  }
  

}
