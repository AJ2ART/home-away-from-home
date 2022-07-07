import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Router, ActivatedRoute } from "@angular/router";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-rental',
  templateUrl: './add-rental.component.html',
  styleUrls: ['./add-rental.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})

export class AddRentalComponent implements OnInit {
  username: string = '';

  rentalForm = {
    username: '',
    description: '',
    amenities: '',
    address: '',
    email: '',
    phone: '',
  };

  uploadedFiles: any[] = [];
  uploadMaxFileSize = 1000000;

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService 
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  saveForm() {

  }

  clearForm() {
    this.rentalForm = {
      username: '',
      description: '',
      amenities: '',
      address: '',
      email: '',
      phone: ''
    };
  }

  cancelForm() {
    this.clearForm();
    this.router.navigate(["list-vacancies"]);
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }
}
