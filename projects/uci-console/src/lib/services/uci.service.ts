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

    // tslint:disable-next-line:variable-name
    private _userDetails: any;

    // tslint:disable-next-line:variable-name
    private _userName: any;

    // tslint:disable-next-line:variable-name
    private _forumIds: any;

    // tslint:disable-next-line:variable-name
    private _context: any = {};

    usr: any;

    // todo add this in separate file
    BASE_URL = 'http://uci-dev3.ngrok.samagra.io/admin/v1/';
    FORM_BASE_URL = 'https://dev.sunbirded.org/';

    constructor(public http: HttpClient) {
        super(http);
    }

    fetchAllChatBots(params): Observable<any> {
        return this.getRequest(this.BASE_URL + 'bot/get', params);
    }

    toggleBotStatus(botId): Observable<any> {
        return this.getRequest(this.BASE_URL + 'bot/get', {});
    }

    fetchUserSegment(params): Observable<any> {
        return this.getRequest(this.BASE_URL + 'userSegment/get', params);
    }

    botCreate(data) {
        return this.postRequest(this.BASE_URL + 'bot/create', data);
    }

    readForm(data) {
        return this.postRequest(this.FORM_BASE_URL + 'api/data/v1/form/read', data);
    }

    // createPost(data: any) {
    //   // return this.http.post(urlConfig.createPost(), data);
    //   return this.csDiscussionService.createPost(data);
    // }
    // /**
    //  * @description To get all the categories
    //  */

    // fetchAllCategories() {
    //   // return this.http.get<NSDiscussData.ICategorie[]>(urlConfig.getAllCategories()).pipe(
    //   //   map((data: any) => {
    //   //       // Taking only "categories" from the response
    //   //       const resp = (data as any).categories;
    //   //       return resp;
    //   //   }),
    //   //   catchError( error => {
    //   //     return throwError( 'Something went wrong!' );
    //   //   })
    //   // );
    //   console.log('in fetchall categories');
    //   return this.csDiscussionService.fetchAllCategories().pipe(
    //     map((data: any) => data.categories)
    //   );
    // }

    // fetchSingleCategoryDetails(cid: any) {
    //   return this.csDiscussionService.fetchSingleCategoryDetails(cid);
    //   // return this.http.get<NSDiscussData.ICategorie>(urlConfig.getSingleCategoryDetails(cid));
    // }
    // fetchSingleCategoryDetailsSort(cid: number, sort: any, page?: any) {
    //   return this.csDiscussionService.fetchSingleCategoryDetails(cid);
    // }

    // set userDetails(userDetails) {
    //   this._userDetails = userDetails;
    // }

    // get userDetails() {
    //   return this._userDetails;
    // }

    // set userName(userName) {
    //   this._userName = userName;
    // }

    // get userName() {
    //   return this._userName;
    // }

    // setContext(key, value) {
    //   if (CONTEXT_PROPS[key]) {
    //     this._context[key] = value;
    //   } else {
    //     console.log('Context can not be set for this key: ', key);
    //   }
    // }

    // getContext(key?: string) {
    //   return key ? this._context[key] : this._context;
    // }

}
