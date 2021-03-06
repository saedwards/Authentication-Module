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

    public errors:Array<string> = [];

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

        if (!RegistrationComponent.validateNewUser(userModel).isValid) {
            return new Promise((resolve, reject) => {
                setTimeout(() => { reject(); }, 0);
            })
            .catch(err => console.log(err));
        }

        return this.authenticationService.register(userModel)
            .catch(err => this.handleServerError(err));

    }

    /**
     * Should be external dependency
     */
    public static validateNewUser (user:NewUser) {

        let isValid = !(
            user.FirstName === '' ||
            user.LastName === '' ||
            user.Email === '' ||
            user.Username === '' ||
            user.Password === '' ||
            user.ConfirmPassword === '');

        return {
            isValid: isValid
        };

    }

    private handleServerError (err:String) {

        if (err) {
            this.errors.push(err);
        }

    }
}
