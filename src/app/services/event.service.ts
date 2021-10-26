import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    public tokenSub: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false)
    public readonly tokenSubObservable$: Observable<any> = this.tokenSub.asObservable()

    constructor() {
    }
    updateHeader(value) {
        console.log(value)
        this.tokenSub.next(value);
    }
}