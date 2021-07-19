import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UciService extends BaseService {
    BASE_URL = 'https://uci-server.ngrok.samagra.io/admin/v1/';
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

    pauseConversation(botId): Observable<any> {
        return this.getRequest(this.BASE_URL + `bot/pause/${botId}`);
    }

    startConversation(botId): Observable<any> {
        return this.getRequest(this.BASE_URL + `bot/start/${botId}`);
    }

    deleteConversation(botId): Observable<any> {
        return this.getRequest(this.BASE_URL + `bot/delete/${botId}`);
    }

    getBotUserDetails(id) {
        return this.getRequest(this.BASE_URL + `bot/get/${id}`);
    }

    getCheckStartingMessage(param) {
        return this.getRequest(this.BASE_URL + `bot/getByParam`, param);
    }

    botCreate(data) {
        return this.postRequest(this.BASE_URL + 'bot/create', data);
    }

    botUpdate(id, data) {
        return this.postRequest(this.BASE_URL + `bot/update/${id}`, data);
    }

    // User Segment APIs
    fetchUserSegment(params): Observable<any> {
        return this.getRequest(this.BASE_URL + 'userSegment/get', params);
    }

    searchUserSegment(params): Observable<any> {
        return this.getRequest(this.BASE_URL + 'userSegment/search', params);
    }

    createUserSegment(data) {
        return this.postRequest(this.BASE_URL + 'userSegment/create', data);
    }

    userSegmentQueryBuilder(data) {
        return this.postRequest(this.BASE_URL + 'userSegment/queryBuilder', data);
    }

    // Conversation APIs
    createLogic(data) {
        return this.postRequest(this.BASE_URL + 'conversationLogic/create', data);
    }

    updateLogic(id, data) {
        return this.postRequest(this.BASE_URL + `conversationLogic/update/${id}`, data);
    }

    deleteLogic(id) {
        return this.getRequest(this.BASE_URL + `conversationLogic/delete/${id}`);
    }

    // Mis APIs
    uploadFile(obj): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'multipart/form-data');

        return this.http.post(this.BASE_URL + 'forms/upload', this.toFormData(obj), {headers});
    }

    readForm(data) {
        return this.postRequest(this.FORM_BASE_URL + 'api/data/v1/form/read', data);
    }
}
