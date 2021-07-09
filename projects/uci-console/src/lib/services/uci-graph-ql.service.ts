import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from './base.service';


@Injectable({
    providedIn: 'root'
})
export class UciGraphQlService extends BaseService {
    BASE_URL = 'https://9473ce34f5dd.ngrok.io/v1/graphql';

    constructor(public http: HttpClient) {
        super(http);
    }

    getState() {
        return this.baseRequest({
            query: `query getListOfStates{
            organisation(distinct_on:state){
            state}}`
        });
    }

    getDistrict(param) {
        return this.baseRequest({
            query: `query getListOfDistrictInState($state:String){
            organisation(where:{state:{_eq:$state}},  distinct_on:district){
            district}}`,
            variables: param
        });
    }

    getBlock(param) {
        return this.baseRequest({
            query: `query getListOfBlocksUnderDistrict($district:String,$state:String){
            organisation(where:{state:{_eq:$state},district:{_eq:$district}},distinct_on:block){
            block}}`,
            variables: param
        });
    }

    getSchoolDetails(param) {
        return this.baseRequest({
            query: `query getListOfBlocksUnderDistrict($district:String,$state:String,$block:String){
  organisation(where:{state:{_eq:$state},district:{_eq:$district},block:{_eq:$block}}){
    school
    school_code}}`,
            variables: param
        });
    }

    getClusters(param) {
        return this.baseRequest({
            query: `query getListOfClustersUnderBlockAndDistrict($block:String,$district:String,$state:String){
             organisation(where:{state:{_eq:$state},district:{_eq:$district},block:{_eq:$block}},distinct_on:cluster){
             cluster}}`,
            variables: param
        });
    }

    getRole() {
        return this.baseRequest({
            query: `query fetchListOfRoles{
            role{
            id
            name}}`
        });
    }

    getBoards() {
        return this.baseRequest({
            query: `query listOfBoards{
            board{
              id
             name}}`
        });
    }

    private baseRequest(body) {
        const headers = {'x-hasura-admin-secret': ''};
        return this.http.post(this.BASE_URL, body, {
            headers
        });
    }
}
