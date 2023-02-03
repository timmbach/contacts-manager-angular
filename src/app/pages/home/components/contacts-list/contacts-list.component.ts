import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css'],
})
export class ContactsListComponent {
  @Input() loading: boolean = false;
  @Input() contacts: IContact[] = [];
  public activeContactId: string | null = '';
  public activeContact: IContact = {} as IContact;
  public errorMessage: string | null = '';

  constructor(
    private _contactService: ContactService,
    private _router: Router
  ) {}

  setActiveContact(contactId: string) {
    this.activeContactId = contactId;
    console.log(this.activeContactId);

    this._contactService.getContact(this.activeContactId).subscribe(
      (data) => {
        this.activeContact = data;
        console.log(this.activeContact);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
  getAllContacts() {
    this._contactService.getAllContacts().subscribe(
      (data) => {
        this.contacts = data;
      },
      (error) => {
        this.errorMessage;
      }
    );
  }

  deleteContact(contactId: string) {
    this._contactService.deleteContact(contactId).subscribe(
      (data) => {
        this.getAllContacts();
        // this._router.navigate(['/']).then();
        location.reload();
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
