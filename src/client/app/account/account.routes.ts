import { RouterConfig } from '@angular/router';

import { AccountComponent } from './index';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './changepassword/changepassword.component';
import { AdminComponent } from './admin/admin.component';

export const AccountRoutes: RouterConfig = [
    {
        path: 'account',
        component: AccountComponent
    },
    {
        path: 'account/registration',
        component: RegistrationComponent
    },
    {
        path: 'account/login',
        component: LoginComponent
    },
    {
        path: 'account/changepassword',
        component: ChangePasswordComponent
    },
    {
        path: 'account/admin',
        component: AdminComponent
    }
];
