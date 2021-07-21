import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {GlobalService} from './global.service';

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    constructor(public http: HttpClient, public globalService: GlobalService) {
    }

    public getRequest(url, params: any = {}, headers: any = {}) {
        const user = this.globalService.getUser();
        if (user && user.id) {
            headers.ownerID = user.id;
        }
        if (user && user.rootOrgId) {
            headers.ownerID = user.rootOrgId;
        }

        return this.http.get(url, {params, headers}).pipe(
            map(res => {
                // console.log('-->>res.result', res['result']);
                return res['result'];
            }),
            catchError(err => {
                return this.handleError(err);
            })
        );
    }

    public postRequest(url, data = {}, headers: any = {}) {
        const user = this.globalService.getUser();
        if (user && user.id) {
            headers.ownerID = user.id;
        }
        if (user && user.rootOrgId) {
            headers.ownerID = user.rootOrgId;
        }
        return this.http.post(url, data).pipe(
            map(res => {
                // console.log('-->>res', res['result']);
                return res['result'];
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
