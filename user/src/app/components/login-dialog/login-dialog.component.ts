import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LoginUser } from 'src/app/models/LoginUser';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  enterListener: any;

  constructor(
    private authenticationService: AuthenticationService,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private formBuilder: FormBuilder) {

    this.enterListener = (event) => {
      if (event.keyCode === 13) {
        this.loginUser();
      }
    };
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({ username: [], password: [] });
    document.addEventListener('keyup', this.enterListener);
  }

  ngOnDestroy(): void {
    document.removeEventListener('keyup', this.enterListener);
  }

  loginUser() {
    const loginUser = new LoginUser(this.loginForm.value.username, this.loginForm.value.password);
    this.authenticationService.login(loginUser).subscribe(
      (data) => {
        this.dialogRef.close(data);
      },
      () => {
        this.loginForm.get('username').setErrors({ loginFailed: true });
        this.loginForm.get('password').setErrors({ loginFailed: true });
      }
    );
  }

}
