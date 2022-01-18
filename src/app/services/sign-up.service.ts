import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  public userData: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public tokenSubObservable$: Observable<any> = this.userData.asObservable();

  constructor() {}
  updateHeader(value: any) {
    console.log(value);
    this.userData.next(value);
  }
}
