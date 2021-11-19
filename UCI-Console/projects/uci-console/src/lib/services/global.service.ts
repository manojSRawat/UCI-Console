import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    private user: BehaviorSubject<any> = new BehaviorSubject(undefined);
    public readonly user$ = this.user.asObservable();
    private baseUrl: BehaviorSubject<any> = new BehaviorSubject(undefined);
    private blobUrl: BehaviorSubject<any> = new BehaviorSubject(undefined);
    public readonly baseUrl$ = this.baseUrl.asObservable();

    constructor() {
    }

    setUser(user) {
        this.user.next(user);
    }

    getUser() {
        return this.user.value;
    }

    setBaseUrl(baseUrl) {
        this.baseUrl.next(baseUrl);
    }

    getBaseUrl() {
        return this.baseUrl.value;
    }

    setBlobUrl(baseUrl) {
        this.blobUrl.next(baseUrl);
    }

    getBlobUrl() {
        return this.blobUrl.value;
    }
}
