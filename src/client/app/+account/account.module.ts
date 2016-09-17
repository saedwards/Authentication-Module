import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AccountComponent } from './account.component';
import { AdminComponent } from './admin/admin.component';
import { ChangePasswordComponent } from './changepassword/changepassword.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthenticationService, AuthenticationAPI } from '../services/index';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [
        AccountComponent,
        RegistrationComponent,
        LoginComponent,
        ChangePasswordComponent,
        AdminComponent
    ],
    exports: [
        AccountComponent,
        AdminComponent,
        ChangePasswordComponent,
        LoginComponent,
        RegistrationComponent
    ],
    providers: [AuthenticationService, AuthenticationAPI]
})
export class AccountModule { }
