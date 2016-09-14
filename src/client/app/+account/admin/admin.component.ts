import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { AuthenticatedUser } from '../../models/user';
import { AuthenticationService } from '../../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'admin.component.html'
})
export class AdminComponent implements OnInit {

    private users:Array<AuthenticatedUser> = [];
    private roles:Array<String>;

    constructor (
        private authenticationService:AuthenticationService) {}

    public ngOnInit () {

        this.authenticationService.getUsers()
            .then((res:Response) => this.updateUsers(res));

        this.authenticationService.getRoles()
            .then((res:Response) => this.updateRoles(res));

    }

    public updateUsers (res) {

        if(res.length) {
            this.users = res;
        }
    }

    public updateRoles (res) {

        if(res.length) {
            this.roles = res;
        }
    }

    public handleDeleteUser (id:String) {

        this.authenticationService.deleteUser(id);
    }


    public handleUserChangeRoles (userId:String, checked:Boolean, roleName:String) {

        console.log(userId, checked, roleName);

        let newUserRoles:Array,

            user:AuthenticatedUser = this.users.find((user:AuthenticatedUser) => {
                return user.id === userId;
            });

        if(user) {

            newUserRoles = Object.assign([], user.roles || []);

            console.log(newUserRoles, roleName, newUserRoles.indexOf(roleName));

            let index = newUserRoles.indexOf(roleName);

            if (checked && index === -1) {
                newUserRoles.push(roleName);
            }else if (!checked && index > -1) {
                newUserRoles.splice(index, 1);
            }

            console.log(newUserRoles);

            this.authenticationService.assignRolesToUser(userId, newUserRoles)
                .then(() => user.roles = newUserRoles)
                .catch((err) => console.log(err));

        }

        /**
         * Send: id, rolesArr
         */
    }

    public userHasRole (userRoles, roleName:String) {
        return userRoles.find((userRole) => {
            return userRole === roleName;
        });
    }

}
