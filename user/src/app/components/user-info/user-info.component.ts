import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
import { SnackBar } from 'src/app/utils';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  private user: any;
  private userExists = false;
  private loadingUser = true;
  private profileForm: FormGroup;
  private initForm: any;
  private changedForm = false;

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private snackBar: SnackBar,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.user = this.userService.getOneUser(this.authenticationService.getUsername()).subscribe(
      (user) => {
        this.user = user;
        this.userExists = true;

        this.profileForm = this.formBuilder.group({
          firstName: [this.user.firstName, Validators.required],
          lastName: [this.user.lastName, Validators.required],
          email: [{ value: this.user.email, disabled: true }]
        });

        this.initForm = this.profileForm.value;

        this.profileForm.valueChanges.subscribe(
          () => {
            if (JSON.stringify(this.initForm) !== JSON.stringify(this.profileForm.value)) {
              this.changedForm = true;
            } else {
              this.changedForm = false;
            }
          }
        );
      },
      (error) => {
        this.snackBar.showSnackBar(error.error.message);
        this.userExists = false;
      },
      () => {
        this.loadingUser = false;
      }
    );
  }

  updateUser() {
    const formValue = this.profileForm.value;
    const userToUpdate = JSON.parse(JSON.stringify(this.user));

    userToUpdate.firstName = formValue.firstName;
    userToUpdate.lastName = formValue.lastName;

    this.userService.updateUser(userToUpdate).subscribe(
      (data) => {
        this.user = data;
        this.initForm = this.profileForm.value;
        this.changedForm = false;
        this.snackBar.showSnackBar('Changes successfully saved!');
      },
      (error) => {
        this.snackBar.showSnackBar(error.error.message);
      }
    );
  }
}
