export class LoginAgent {
    username: string;
    password: string;
    authority: string;

    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.authority = 'ROLE_AGENT';
    }
}
