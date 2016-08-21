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
    public isLoggedIn:Observable<boolean> = this._isLoggedIn.asObservable();

    private _userModel:BehaviorSubject<User> = new BehaviorSubject(new User());
    public userModel:Observable<AuthenticatedUser> = this._userModel.asObservable();

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
        private authenticationAPI:AuthenticationAPI) {}

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
    public login(username:String, password:String):Promise<Response> {

        return this.authenticationAPI.OauthToken(username, password)
            .then((res:Response) => {
                this.doLogin(res['access_token']);
                return res;
            })
            .then((res:Response) => {
                this.getUser(username);
                return res;
            });

    }

    public getUser(username:String):Promise<Response> {

        return this.authenticationAPI.ApiAccountsUserByUsername(username)
            .then((res:Response) => {
                this.cacheUser(res);
                return res;
            });

    }

    public getUsers():Promise<Response> {

        return this.authenticationAPI.ApiAccountsGetAllUsers()
            .then((res:Response) => res);
    }

    public deleteUser(id:String):Promise<Response> {

        return this.authenticationAPI.ApiAccountsDeleteUser(id)
            .then((res:Response) => res);
    }

    private cacheUser (res) {

        this._userModel.next(res);
    }

    private doLogin (token:String) {

        if (token) {
            this.authenticationAPI.setToken(token);
            this.sessionState.user.isLoggedIn = true;

            this._isLoggedIn.next(true);
        }
    }

}