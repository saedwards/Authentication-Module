import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { NewUser } from '../models/user';

@Injectable()
export class AuthenticationAPI {

    private apiBaseUrl = 'http://localhost:61444/';
    private errors:Array<any>  = [];

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
            .toPromise(Promise)
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
            .catch(err => this.handleError(err));

    }

    public ApiAccountsUserByUsername (username:String) {

        if(!this.headers.get('Authorization')) {
            return this.notAuthenticated();
        }

        return this.http.get(
            this.apiBaseUrl + 'api/accounts/user/' + username,
            { headers: this.headers })
            .toPromise()
            .then((res:Response) => res.json())
            .catch(() => this.handleError);
    }

    public ApiAccountsGetAllUsers () {

        if(!this.headers.get('Authorization')) {
            return this.notAuthenticated();
        }

        return this.http.get(
            this.apiBaseUrl + 'api/accounts/users',
            { headers: this.headers })
            .toPromise()
            .then((res:Response) => res.json())
            .catch(() => this.handleError);
    }

    public ApiAccountsDeleteUser (guid:String) {

        if(!this.headers.get('Authorization')) {
            return this.notAuthenticated();
        }

        return this.http.delete(
            this.apiBaseUrl + 'api/accounts/user/' + guid,
            { headers: new Headers({
                'Authorization': this.headers.get('Authorization'),
                'Accept': '*/*'
            }) })
            .toPromise()
            .then((res:Response) => res.json())
            .catch(() => this.handleError);
    }

    public ApiAssignRolesToUser (guid:String, roles:Array) {

        if(!this.headers.get('Authorization')) {
            return this.notAuthenticated();
        }

        return this.http.put(
            this.apiBaseUrl + 'api/accounts/user/' + guid + '/roles',
            JSON.stringify(roles),
            { headers: this.headers })
            .toPromise()
            .then((res:Response) => res.json())
            .catch(() => this.handleError);
    }

    public ApiAccountsChangePassword (oldPassword:String, newPassword:String, confirmPassword) {

        if(!this.headers.get('Authorization')) {
            return this.notAuthenticated();
        }

        return this.http.post(
            this.apiBaseUrl + 'api/accounts/changepassword',
            JSON.stringify({
                'OldPassword': oldPassword,
                'NewPassword': newPassword,
                'ConfirmPassword': confirmPassword
            }),
            { headers: this.headers })
            .toPromise()
            .then((res:Response) => res.json())
            .catch(() => this.handleError);
    }


    /**
     * Roles Endpoint Controller
     */
    public ApiRolesGetAllRoles () {

        if(!this.headers.get('Authorization')) {
            return this.notAuthenticated();
        }

        return this.http.get(
            this.apiBaseUrl + 'api/roles',
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

    private notAuthenticated ():Promise {

        console.log('User not authenticated.');

        return new Promise((resolve, reject) => {
            setTimeout(() => { reject(); }, 0);
        })
        .catch(err => console.log(err));
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
