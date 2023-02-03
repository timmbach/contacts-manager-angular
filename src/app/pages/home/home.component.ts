import { Component } from '@angular/core';
import { IContact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public loading: boolean = false;
  public contacts: IContact[] = [];
  errorMessage: string | null = null;

  constructor(private _contactService: ContactService) {}
  ngOnInit(): void {
    this.loading = true;
    this._contactService.getAllContacts().subscribe(
      (data) => {
        this.contacts = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
