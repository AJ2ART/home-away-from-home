import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Router, ActivatedRoute } from "@angular/router";
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-list-vacancies',
  templateUrl: './list-vacancies.component.html',
  styleUrls: ['./list-vacancies.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ListVacanciesComponent implements OnInit {

  rentalForms: any = [];

  // rentalForm = {
  //   id: '',
  //   firstName: '',
  //   lastName: '',
  //   bedrooms: '',
  //   bathrooms: '',
  //   roomsAvailable: '',
  //   amenities: '',
  //   price: '',
  //   description: '',
  //   address1: '',
  //   city: '',
  //   state: '',
  //   zipCode: '',
  //   email: '',
  //   phone: '',
  //   images: new Array<any>()
  // };

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private route: ActivatedRoute,
    private _rentalService: RentalService,
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this._rentalService.getLists().subscribe((list) => {
      console.log("list: ", list);
      this.rentalForms = list;
    });

  }

  navToDetails(id: any) {
    this.router.navigate([`list-vacancies/${id}/details`]);
  }

}
