import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/contact.model';
import { IGroup } from 'src/app/models/group.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent {
  public loading: boolean = false;
  public loadingNewContact: boolean = false;
  public contact: IContact = {} as IContact;
  public groups: IGroup[] = [];
  public errorMessage: string = '';
  groupSelectionError = true;

  constructor(
    private _contactService: ContactService,
    private _router: Router
  ) {
    this.loading = true;

    this._contactService.getAllGroups().subscribe(
      (data) => {
        this.groups = data;
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  validateGroup(value: string) {
    if (value === 'Select Group' || value === '') {
      this.groupSelectionError = true;
    } else {
      this.groupSelectionError = false;
    }
  }

  addContact() {
    this.loadingNewContact = true;
    this._contactService.addContact(this.contact).subscribe(
      (data) => {
        this.loadingNewContact = false;
        this._router.navigate(['/']).then();
      },
      (error) => {
        this.errorMessage = error;
        this._router.navigate(['/add-contact']).then();
      }
    );
  }
}
