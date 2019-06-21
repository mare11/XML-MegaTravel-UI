import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { SnackBar } from 'src/app/utils';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = [];

  constructor(private UserService: UserService,
    private snackBar: SnackBar) { }

  ngOnInit() {
    this.UserService.getUsers().subscribe(
      (data: any) => {
        this.users = data;
      });
  }

  blockUser(user: any) {
    this.UserService.disableUser(user).subscribe(
      (data: any) => {
        for (var i = 0; i < this.users.length; i++) {
          if (this.users[i].username == data.username) {
            this.users.splice(i, 1, data);
            this.snackBar.showSnackBar('User successfuly blocked');
          }
        }
      },
      () => {
        this.snackBar.showSnackBar('An error occurred. Try again');
      }
    )
  }

  activeteUser(user: any) {
    this.UserService.enableUser(user).subscribe(
      (data: any) => {
        for (var i = 0; i < this.users.length; i++) {
          if (this.users[i].username == data.username) {
            this.users.splice(i, 1, data);
            this.snackBar.showSnackBar('User successfuly activated');
          }
        }
      },
      () => {
        this.snackBar.showSnackBar('An error occurred. Try again');
      }
    )
  }

  deleteUser(user: any) {
    if (confirm('Are you sure you want to delete ' + user.username + ' ?')) {
      this.UserService.deleteUser(user).subscribe(
        (data: any) => {
          for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].username == data.username) {
              this.users.splice(i, 1, data);
              this.snackBar.showSnackBar('User successfuly deleted');
            }
          }
        },
        () => {
          this.snackBar.showSnackBar('An error occurred. Try again');
        }
      )
    }
  }
}
