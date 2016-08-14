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

    constructor (
        private authenticationService:AuthenticationService) {
        console.log('accounts');
    }

    public ngOnInit () {

        console.log('initialised');

        let subscription = this.authenticationService.isLoggedIn.subscribe(
            value => this.something(value),
            error => console.log('fuck')
        );
    }

    private something (val) {
        console.log(val);
    }

}