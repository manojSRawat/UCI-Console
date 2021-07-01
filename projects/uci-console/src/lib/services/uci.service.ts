import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

    fetchAllChatBots(params): Observable<any> {
        return this.getRequest(this.BASE_URL + 'bot/get', params);
    }

    searchChatBots(params): Observable<any> {
        return this.getRequest(this.BASE_URL + 'bot/search', params);
    }

    toggleBotStatus(botId): Observable<any> {
        return this.getRequest(this.BASE_URL + 'bot/get', {});
    }

    fetchUserSegment(params): Observable<any> {
        return this.getRequest(this.BASE_URL + 'userSegment/get', params);
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
}
