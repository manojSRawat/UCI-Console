import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    constructor(public http: HttpClient) {
    }

    public getRequest(url, params = {}) {
        return this.http.get(url, {params}).pipe(
            map(res => {
                return res;
            }),
            catchError(err => {
                return this.handleError(err);
            })
        );
    }

    public postRequest(url, data = {}) {
        return this.http.post(url, data).pipe(
            map(res => {
                return res;
            }),
            catchError(err => {
                return this.handleError(err);
            })
        );
    }


    public handleError(error: HttpErrorResponse) {
        if (error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError(error.error);
    }
}
