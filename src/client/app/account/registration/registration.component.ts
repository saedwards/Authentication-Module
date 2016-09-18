import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { AuthenticationService } from '../../services/index';
import { NewUser } from '../../models/user';

@Component({
    moduleId: module.id,
    templateUrl: 'registration.component.html'
})
export class RegistrationComponent {

    /**
     * Convert simple properties to RxJS observables and attach validation
     */
    private firstName:String = '';
    private lastName:String = '';
    private email:String = '';
    private username:String = '';
    private password:String = '';
    private confirmPassword:String = '';

    constructor(
        private authenticationService: AuthenticationService) {}

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
