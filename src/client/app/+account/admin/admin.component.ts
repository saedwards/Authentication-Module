import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'admin.component.html'
})
export class AdminComponent {

    private user:Array<User> = [];

}