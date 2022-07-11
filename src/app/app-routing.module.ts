import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRentalComponent } from './main-app/add-rental/add-rental.component';
import { ListVacanciesComponent } from './main-app/list-vacancies/list-vacancies.component';
import { PropertyDetailsPageComponent } from './main-app/list-vacancies/property-details-page/property-details-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-vacancies',
    pathMatch: 'full'
  },
  {
    path: 'add-rental',
    component: AddRentalComponent
  },
  {
    path: 'list-vacancies',
    component: ListVacanciesComponent
  },
  {
    path: 'list-vacancies/:id/details',
    component: PropertyDetailsPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
