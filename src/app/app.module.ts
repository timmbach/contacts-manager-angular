import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AddContactComponent } from './pages/add-contact/add-contact.component';
import { EditContactComponent } from './pages/edit-contact/edit-contact.component';
import { ViewContactComponent } from './pages/view-contact/view-contact.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './pages/home/components/spinner/spinner.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ContactsListComponent } from './pages/home/components/contacts-list/contacts-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddContactComponent,
    EditContactComponent,
    ViewContactComponent,
    NavbarComponent,
    SpinnerComponent,
    PageNotFoundComponent,
    ContactsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
