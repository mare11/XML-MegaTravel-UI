import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LoginAdmin } from 'src/app/models/LoginAdmin';
import { Router } from '@angular/router';
import { SnackBar } from 'src/app/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  enterListener: any;
  loggingInProgress = false;

  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router, private snackBar: SnackBar) {

    this.enterListener = (event) => {
      if (event.keyCode === 13) {
        this.loginAdmin();
      }
    };
  }

  ngOnInit() {
    if (this.authenticationService.getUsername()) {
      this.router.navigate(['/homepage']);
    }
    this.loginForm = this.formBuilder.group({ username: [], password: [] });
    document.addEventListener('keyup', this.enterListener);
  }

  ngOnDestroy(): void {
    document.removeEventListener('keyup', this.enterListener);
  }

  loginAdmin() {
    this.loggingInProgress = true;
    const loginAdmin = new LoginAdmin(this.loginForm.value.username, this.loginForm.value.password);
    this.authenticationService.login(loginAdmin).subscribe(
      (data: any) => {
        this.authenticationService.setUserState(data);
        this.router.navigate(['/homepage']);
        this.snackBar.showSnackBar('Logged in successfully!');
        this.loggingInProgress = false;
      },
      () => {
        this.loginForm.get('username').setErrors({ loginFailed: true });
        this.loginForm.get('password').setErrors({ loginFailed: true });
        this.loggingInProgress = false;
      }
    );
  }

}
