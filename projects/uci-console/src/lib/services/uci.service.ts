import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';

export const CONTEXT_PROPS = {
    cid: 'cid',
    tid: 'tid',
    uid: 'uid'
};

@Injectable({
    providedIn: 'root'
})
export class UciService extends BaseService {
    BASE_URL = 'http://uci-dev4.ngrok.samagra.io/admin/v1/';
    FORM_BASE_URL = 'https://dev.sunbirded.org/';

    constructor(public http: HttpClient) {
        super(http);
    }

    fetchConversation(params): Observable<any> {
        return this.getRequest(this.BASE_URL + 'bot/get', params);
    }

    searchConversation(params): Observable<any> {
        return this.getRequest(this.BASE_URL + 'bot/search', params);
    }

    toggleConversationStatus(botId): Observable<any> {
        return this.getRequest(this.BASE_URL + 'bot/get', {});
    }

    deleteConversation(botId): Observable<any> {
        return this.getRequest(this.BASE_URL + `bot/delete/${botId}`, {});
    }

    fetchUserSegment(params): Observable<any> {
        return this.getRequest(this.BASE_URL + 'userSegment/get', params);
    }

    searchUserSegment(params): Observable<any> {
        return this.getRequest(this.BASE_URL + 'userSegment/search', params);
    }

    createUserSegment(data) {
        return this.postRequest(this.BASE_URL + 'userSegment/create', data);
    }

    createLogic(data) {
        return this.postRequest(this.BASE_URL + 'conversationLogic/create', data);
    }

    botCreate(data) {
        return this.postRequest(this.BASE_URL + 'bot/create', data);
    }

    readForm(data) {
        return this.postRequest(this.FORM_BASE_URL + 'api/data/v1/form/read', data);
    }

    deleteLogic(id) {
        return this.getRequest(this.BASE_URL + `conversationLogic/delete/${id}`);
    }

    uploadFile(obj): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'multipart/form-data');

        return this.http.post('http://68.183.81.222:8000/api/files', toFormData(obj), {headers});
    }
}

export function toFormData<T>(formValue: T) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
        const value = formValue[key];
        formData.append(key, value);
    }

    return formData;
}
