import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    private user: BehaviorSubject<any> = new BehaviorSubject(undefined);
    public readonly user$ = this.user.asObservable();

    constructor() {
    }

    setUser(user) {
        this.user.next(user);
    }

    getUser() {
        return this.user.value;
    }
}
