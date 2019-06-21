export class Agent {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    adress: string;
    bussinesID: string;

    constructor(username, password, email, firstName, lastName, address, bussinesID) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.adress = address;
        this.bussinesID = bussinesID;
    }
}
