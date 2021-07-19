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
            return throwError(error.error.message);
        }

        return throwError(error.error);
    }

    public toFormData<T>(formValue: T) {
        const formData = new FormData();

        for (const key of Object.keys(formValue)) {
            const value = formValue[key];
            formData.append(key, value);
        }

        return formData;
    }
}
