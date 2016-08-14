class User {
    FirstName:String;
}

class NewUser extends User {
    LastName: String;
    Email: String;
    Username: String;
    Password: String;
    ConfirmPassword: String;
}

class AnonymousUser extends User {
    FirstName = 'Anonymous';
}

class AuthenticatedUser extends User {
    id:String;
    fullName: String;
    userName: String;
    url:String;
    email:String;
    emailConfirmed:boolean;
    level:Number;
    joinDate:String;
    roles:Array<String>;
    claims:Array<String>;
}

export { NewUser, AnonymousUser, AuthenticatedUser, User }