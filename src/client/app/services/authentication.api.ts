import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { NewUser } from '../models/user';

@Injectable()
export class AuthenticationAPI {

    private apiBaseUrl = 'http://localhost:61444/';
    private errors:Array<any>  = [];
    private accessToken:String;

    /**
     * Bad - unable to mock header revisit
     * @type {Headers}
     */
    private headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'});

    private encryptedHeaders = new Headers({
        'Accept': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    constructor(private http: Http) {}

    public OauthToken (username:String, password:String):Promise<Response> {

        return this.http.post(
            this.apiBaseUrl + 'oauth/token',
            'grant_type=password&username=' + username + '&password=' + password,
            { headers: this.encryptedHeaders })
            .toPromise()
            .then((res:Response) => res.json())
            .catch(() => this.handleError);
    }

    public ApiAccountsCreate (userModel:NewUser) {

        return this.http.post(
            this.apiBaseUrl + 'api/accounts/create',
            JSON.stringify(userModel),
            { headers: this.headers })
            .toPromise()
            .then((res:Response) => res.json().data)
            .catch(() => this.handleError);

    }

    public ApiAccountsUserByUsername (username:String) {

        if(!this.headers.get('Authorization')) {
            throw 'User not authenticated.';
        }

        return this.http.get(
            this.apiBaseUrl + 'api/accounts/user/' + username,
            { headers: this.headers })
            .toPromise()
            .then((res:Response) => res.json())
            .catch(() => this.handleError);
    }

    public setToken (token:String) {
        let authToken = token;

        if (this.headers.get('Authorization')) {
            this.unsetToken();
        }

        this.headers.append('Authorization', `Bearer ${authToken}`);
    }

    public unsetToken () {
        if (this.headers.get('Authorization')) {
            this.headers.delete('Authorization');
        }
    }

    private handleError (error:any) {
        let errors:Array<any> = [],
            currentErrorModelState:Object;

        if(error._body) {
            currentErrorModelState = JSON.parse(error._body).modelState;

            for(let i in currentErrorModelState) {
                errors.push(...currentErrorModelState[i]);
            }
        }

        this.errors.push(...errors);

        console.log(this.errors);


        console.log(JSON.parse(error._body));
        console.log('-----');

        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        console.error(errMsg); // log to console instead

        /*if(error instanceof Response) {
         return Observable.throw(error.json().error || 'backend server error');
         }

         return Observable.throw(errMsg);*/
    }

}
