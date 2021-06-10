import { Inject, Injectable } from '@angular/core';
import { of as observableOf, throwError as observableThrowError, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { urlConfig } from '../config/url.config';

export const CONTEXT_PROPS = {
  cid: 'cid',
  tid: 'tid',
  uid: 'uid'
};

@Injectable({
  providedIn: 'root'
})
export class UciService {

  // tslint:disable-next-line:variable-name
  private _userDetails: any;

  // tslint:disable-next-line:variable-name
  private _userName: any;

  // tslint:disable-next-line:variable-name
  private _forumIds: any;

  // tslint:disable-next-line:variable-name
  private _context: any = {};

  usr: any;

  constructor(
    private http: HttpClient
  ) {
    // TODO: Take from the logged in user data;
    // this.usr = this.configSvc.userProfile
    this.usr = { userId: '1234' };

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
