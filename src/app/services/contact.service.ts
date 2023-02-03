import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { IContact } from '../models/contact.model';
import { IGroup } from '../models/group.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private serverUrl: string = 'http://localhost:9000';
  constructor(private http: HttpClient) {}

  // Get All Contacts
  getAllContacts(): Observable<IContact[]> {
    let dataUrl: string = `${this.serverUrl}/contacts`;
    return this.http
      .get<IContact[]>(dataUrl)
      .pipe(retry(1), catchError(this.handleError));
  }
  // Get single Contact
  getContact(contactId: string): Observable<IContact> {
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;

    return this.http
      .get<IContact>(dataUrl)
      .pipe(retry(1), catchError(this.handleError));
  }
  // Create new contact
  addContact(contact: IContact): Observable<IContact> {
    let dataUrl: string = `${this.serverUrl}/contacts`;
    return this.http
      .post<IContact>(dataUrl, contact)
      .pipe(catchError(this.handleError));
  }
  // Update COntact
  editContact(contact: IContact, contactId: string): Observable<IContact> {
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.http
      .put<IContact>(dataUrl, contact)
      .pipe(catchError(this.handleError));
  }
  // Delete COntact
  deleteContact(contactId: string): Observable<IContact> {
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.http
      .delete<IContact>(dataUrl)
      .pipe(catchError(this.handleError));
  }

  // Get All Contact Groups
  getAllGroups(): Observable<IGroup[]> {
    let dataUrl: string = `${this.serverUrl}/groups`;
    return this.http
      .get<IGroup[]>(dataUrl)
      .pipe(retry(1), catchError(this.handleError));
  }
  // Get single Group
  getGroup(groupId: string): Observable<IGroup> {
    let dataUrl: string = `${this.serverUrl}/groups/${groupId}`;

    return this.http
      .get<IGroup>(dataUrl)
      .pipe(retry(1), catchError(this.handleError));
  }
  // Error Handling
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.log(errorMessage);

    return throwError(() => {
      return errorMessage;
    });
  }
}
