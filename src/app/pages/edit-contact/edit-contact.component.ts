import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IContact } from 'src/app/models/contact.model';
import { IGroup } from 'src/app/models/group.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent {
  public loading: boolean = false;
  public loadingUpdateContact: boolean = false;
  public contact: IContact = {} as IContact;
  public contactId: string | null = '';
  public groups: IGroup[] = [];
  public errorMessage: string | null = '';
  public groupSelectionError: boolean = false;

  constructor(
    private _contactService: ContactService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this._activatedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId');
    });
    this.loading = true;
    if (this.contactId) {
      this._contactService.getContact(this.contactId).subscribe(
        (data) => {
          this.contact = data;
          this._contactService.getAllGroups().subscribe((data) => {
            this.groups = data;
          });
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }

  validateGroup(value: string) {
    if (value === 'Select Group' || value === '') {
      this.groupSelectionError = true;
    } else {
      this.groupSelectionError = false;
    }
  }

  updateContact() {
    this.loadingUpdateContact = true;
    if (this.contactId) {
      this._contactService.editContact(this.contact, this.contactId).subscribe(
        (data) => {
          this.loadingUpdateContact = false;
          this._router.navigate(['/']).then();
        },
        (error) => {
          this.errorMessage = error;
          this._router.navigate([`edit-contact/${this.contactId}`]).then();
        }
      );
    }
  }
}
