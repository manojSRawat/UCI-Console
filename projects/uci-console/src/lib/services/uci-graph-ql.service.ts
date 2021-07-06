import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './base.service';


@Injectable({
    providedIn: 'root'
})
export class UciGraphQlService extends BaseService {
    BASE_URL = 'http://uci-bot-db2.ngrok.samagra.io/v1/graphql';

    constructor(public http: HttpClient) {
        super(http);
    }

    getDistrict() {
        return this.baseRequest({
            query: `query getListOfDistrictInState($state:String){
            organisation(where:{state:{_eq:$state}},  distinct_on:district){
            district}}`,
            variables: {state: 'Haryana'}
        });
    }


    private baseRequest(body) {
        const headers = {'x-hasura-admin-secret': 'xx'};
        return this.http.post(this.BASE_URL, body, {
            headers
        });
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
