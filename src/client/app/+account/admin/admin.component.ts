import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'admin.component.html'
})
export class AdminComponent implements OnInit {

    private users:Array<User> = [];

    constructor (
        private authenticationService:AuthenticationService) {}

    public ngOnInit () {

        this.authenticationService.getUsers()
            .then((res:Response) => this.updateUsers(res));

    }

    public updateUsers (res) {

        if(res.length) {
            this.users = res;
        }

        console.log(res);
    }

    public handleDeleteUser (id:String) {

        this.authenticationService.deleteUser(id);
    }

}