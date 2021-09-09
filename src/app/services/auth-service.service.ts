import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }
  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('_ud');
    if (token !== null && token !== undefined) {
      return true;
    } else {
      return false;
    }
  }
}
