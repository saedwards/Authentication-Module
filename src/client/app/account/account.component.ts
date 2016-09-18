import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Subscription } from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    selector: 'account-component',
    templateUrl: 'account.component.html',
    styleUrls: ['account.component.css']
})
export class AccountComponent implements OnInit {

    private userIsLoggedIn:boolean = false;
    private subscription:Subscription;

    constructor (
        private authenticationService:AuthenticationService) {}

    public ngOnInit () {

        this.subscription = this.authenticationService.isLoggedIn.subscribe(
            value => this.handleLoginUpdate(value),
            error => console.log(error)
        );
    }

    private handleLoginUpdate (val:boolean) {

        this.userIsLoggedIn = val;
    }

}
