import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainAppComponent implements OnInit {

  items: MenuItem[] = [];
  // @ts-ignore
  activeItem: MenuItem;

  constructor(
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.items = [
      { label: 'Add Rental', icon: 'pi pi-fw pi-home', routerLink: ['/add-rental'] },
      { label: 'List Vacancies', icon: 'pi pi-fw pi-bars', routerLink: ['/list-vacancies'] },
      { label: 'About', icon: 'pi pi-fw pi-book', routerLink: ['/about'] },
      { label: 'Contact', icon: 'pi pi-fw pi-user-plus', routerLink: ['/contact'] }
    ];
  }

}
