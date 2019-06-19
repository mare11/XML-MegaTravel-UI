export class RegistrationUser {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;

    constructor(username, password, email, firstName, lastName) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
