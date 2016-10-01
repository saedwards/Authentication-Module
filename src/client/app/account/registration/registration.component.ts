import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { AuthenticationService } from '../../services/index';
import { NewUser } from '../../models/user';

@Component({
    moduleId: module.id,
    templateUrl: 'registration.component.html',
    styleUrls: ['registration.component.css']
})
export class RegistrationComponent {

    /**
     * Convert simple properties to RxJS observables and attach validation
     */
    public firstName:String = '';
    public lastName:String = '';
    public email:String = '';
    public username:String = '';
    public password:String = '';
    public confirmPassword:String = '';

    constructor(
        public authenticationService: AuthenticationService) {}

    public register():Promise<Response> {

        let userModel:NewUser = {
            FirstName: this.firstName,
            LastName: this.lastName,
            Email: this.email,
            Username: this.username,
            Password: this.password,
            ConfirmPassword: this.confirmPassword
        };

        return this.authenticationService.register(userModel);

    }
}
