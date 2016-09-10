import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'account',
    templateUrl: 'account.component.html',
    styleUrls: ['account.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class AccountComponent implements OnInit {

    private userIsLoggeIn:boolean = false;
    private subscription;

    constructor (
        private authenticationService:AuthenticationService) {}

    public ngOnInit () {

        this.subscription = this.authenticationService.isLoggedIn.subscribe(
            value => this.handleLoginUpdate(value),
            error => console.log(error)
        );
    }

    private handleLoginUpdate (val) {

        this.userIsLoggeIn = val;
    }

}