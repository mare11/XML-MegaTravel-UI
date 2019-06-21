export class LoginAdmin {
    username: string;
    password: string;
    authority: string;

    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.authority = 'ROLE_ADMIN';
    }
}
