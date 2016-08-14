import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { AuthenticatedUser } from '../../models/user';
import { AuthenticationService } from '../../services/index';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {

    private username:String = '';
    private password:String = '';

    private user:AuthenticatedUser = <AuthenticatedUser>{};

    constructor (
        private authenticationService: AuthenticationService) {}

    public login():Promise<AuthenticatedUser> {
        
        return this.authenticationService.login(
            this.username,
            this.password);

    }

    public update(userModel:AuthenticatedUser) {

        this.user = userModel;

        /*let subscription = this.isLoggedIn.subscribe(
            value => this.something(),
            error => console.log('fuck')
        );*/

    }

    public handle_login_click() {

        this.login().then((userModel:AuthenticatedUser) => this.update(userModel));

    }

}