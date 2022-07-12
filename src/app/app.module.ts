import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//primeNG
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { CarouselModule } from 'primeng/carousel';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';

// Components
import { MainAppComponent } from './main-app/main-app.component';
import { AddRentalComponent } from './main-app/add-rental/add-rental.component';
import { ListVacanciesComponent } from './main-app/list-vacancies/list-vacancies.component';
import { PropertyDetailsPageComponent } from './main-app/list-vacancies/property-details-page/property-details-page.component';


@NgModule({
  declarations: [
    AppComponent,
    MainAppComponent,
    AddRentalComponent,
    ListVacanciesComponent,
    PropertyDetailsPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputSwitchModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    TabMenuModule,
    ImageModule,
    FileUploadModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    CarouselModule,
    ToastModule,
    TagModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
