import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { LoginAgent } from 'src/app/models/LoginAdmin';
import { SnackBar } from 'src/app/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  enterListener: any;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router, private snackBar: SnackBar) {

    this.enterListener = (event) => {
      if (event.keyCode === 13) {
        this.loginAgent();
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

  loginAgent() {
    const loginAgent = new LoginAgent(this.loginForm.value.username, this.loginForm.value.password);
    this.authenticationService.login(loginAgent).subscribe(
      (data: any) => {
        this.authenticationService.setUserState(data);
        this.router.navigate(['/homepage']);
        this.snackBar.showSnackBar('Logged in successfully!');
      },
      () => {
        this.loginForm.get('username').setErrors({ loginFailed: true });
        this.loginForm.get('password').setErrors({ loginFailed: true });
      }
    );
  }

}
