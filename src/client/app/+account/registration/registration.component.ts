import { Component, OnInit } from '@angular/core';
import { Http,Headers, Response } from '@angular/http';
//import { Observable } from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    templateUrl: 'registration.component.html'
})
export class RegistrationComponent {
    private apiUrl = 'http://localhost:61444/api/accounts/create';

    private firstName:string = '';
    private lastName:string = '';
    private email:string = '';
    private username:string = '';
    private password:string = '';
    private confirmPassword:string = '';

    private errors:any[] = [];

    constructor(private http: Http) {}

    public register():Promise {

        let userModel = {
            FirstName: this.firstName,
            LastName: this.lastName,
            Email: this.email,
            Username: this.username,
            Password: this.password,
            ConfirmPassword: this.confirmPassword
        };

        /**
         * Stub
         */
        userModel = {
            FirstName: 'S',
            LastName: 'E',
            Email: 'shane@designsmoothie.com',
            Username: 'seduuards',
            Password: 'password',
            ConfirmPassword: 'password123'
        };

        return this.post(userModel);
    }

    private post (obj) {
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

        /*if(error instanceof Response) {
            return Observable.throw(error.json().error || 'backend server error');
        }

        return Observable.throw(errMsg);*/
    }
}