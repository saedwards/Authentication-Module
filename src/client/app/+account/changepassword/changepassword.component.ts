import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/index';

@Component({
    moduleId: module.id,
    selector: 'account',
    templateUrl: 'changepassword.component.html',
    styleUrls: ['changepassword.component.css']
})
export class ChangePasswordComponent {

    private oldPassword:String = '';
    private newPassword:String = '';
    private confirmPassword:String = '';

    constructor (
        private authenticationService:AuthenticationService) {}

    public changePassword () {

        return this.authenticationService.changePassword(
            this.oldPassword,
            this.newPassword,
            this.confirmPassword
        );

    }

    private handle_password_change () {

        this.changePassword();

    }

}