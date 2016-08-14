import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../services/index';
import { NewUser } from '../../models/user';

@Component({
    moduleId: module.id,
    templateUrl: 'registration.component.html'
})
export class RegistrationComponent {

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

    /*private post (obj) {
        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'});

        return this.http.post(
            this.apiUrl,
            JSON.stringify(obj),
            {
                headers: headers
            })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handlePostError.bind(this));
    }

    private validateForm () {

        if (!this.firstName) {

        }
    }

    private handlePostError (error: any) {
        let errors = [],
            currentErrorModelState;

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

        /!*if(error instanceof Response) {
            return Observable.throw(error.json().error || 'backend server error');
        }

        return Observable.throw(errMsg);*!/
    }*/
}