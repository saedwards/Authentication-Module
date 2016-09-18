import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { User/*, AuthenticatedUser*/ } from '../../models/user';
import { AuthenticationService } from '../../services/index';

@Component({
    moduleId: module.id,
    selector: 'login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

    private username:String = '';
    private password:String = '';

    private user:User = <User>{};

    constructor (
        private authenticationService:AuthenticationService) {}

    public ngOnInit() {

        this.authenticationService.userModel.subscribe(
            value => this.update(value),
            error => console.log(error)
        );
    }

    public login():Promise<Response> {

        return this.authenticationService.login(
            this.username,
            this.password);

    }

    public update(userModel:User) {

        this.user = userModel;
    }

    public handle_login_click() {

        this.login();

    }

}
