import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NewUser, User, AuthenticatedUser } from '../models/user';
import { AuthenticationAPI } from './authentication.api';

@Injectable()
export class AuthenticationService {

    private errors:Array<any>  = [];

    private _isLoggedIn:BehaviorSubject<boolean> = new BehaviorSubject(false);

    /**
     * Expose isLoggedIn property for event binding
     */
    public isLoggedIn:Observable<boolean> = this._isLoggedIn.asObservable();

    /**
     * Use HTML 5
     */
    public sessionState = {
        user: {
            isLoggedIn:Observable,
            isAdmin:Observable,
            model:User
        }
    };

    constructor(
        private authenticationAPI:AuthenticationAPI) {

        this.isLoggedIn.subscribe(
            value => this.something(),
            error => console.log('fuck')
        );
    }

    private something () {
        console.log('tis varking here');
    }

    /**
     * Register User
     * @param userModel
     * @returns {Promise<Response>}
     */
    public register(userModel:NewUser):Promise<Response> {

        /**
         * Validate user model here?
         */

        return this.authenticationAPI.ApiAccountsCreate(userModel);

    }

    /**
     * Login User
     * @param username
     * @param password
     * @returns {Promise<Response>}
     */
    public login(username:String, password:String):Promise<AuthenticatedUser> {

        return this.authenticationAPI.OauthToken(username, password)
            .then((res:Response) => this.doLogin(res['access_token']))
            .then(() => this.getUser(username));

    }

    public getUser(username:String):Promise<AuthenticatedUser> {

        return this.authenticationAPI.ApiAccountsUserByUsername(username)
            .then((res) => this.cacheUser(res));

    }

    private cacheUser (res:AuthenticatedUser) {
        return res;

        /*this.sessionState.user.model = res;
        return this.sessionState.user.model;*/
    }

    private doLogin (token:String) {

        if (token) {
            this.authenticationAPI.setToken(token);
            this.sessionState.user.isLoggedIn = true;

            this._isLoggedIn.next(true);
        }
    }

}