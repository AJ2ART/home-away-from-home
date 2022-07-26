import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MessageService } from 'primeng/api';
import { NgForm, FormControl, FormGroup } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class ContactComponent implements OnInit {

  contactForm = {
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private _contactService: ContactService,
  ) { }

  ngOnInit(): void {
  }

  sendQuery() {
    this._contactService.addQuery(this.contactForm);
    this.messageService.add({ severity: 'success', summary: 'Query Sent!', detail: '' });
    this.clearForm();
  }

  clearForm() {
    this.contactForm.firstName = '',
    this.contactForm.lastName = '',
    this.contactForm.email = '',
    this.contactForm.message = ''
  }

}
