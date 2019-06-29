import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { LoginAgent } from 'src/app/models/LoginAdmin';
import { SnackBar } from 'src/app/utils';
import { SynchronizationService } from 'src/app/services/synchronization/synchronization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  enterListener: any;
  loggingInProgress = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router, private snackBar: SnackBar,
    private syncService: SynchronizationService) {

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
    this.loggingInProgress = true;
    const loginAgent = new LoginAgent(this.loginForm.value.username, this.loginForm.value.password);
    this.authenticationService.login(loginAgent).subscribe(
      (data: any) => {
        this.snackBar.showSnackBar('Logged in successfully! Synchronizing data, please wait...');
        this.authenticationService.setUserState(data);
        this.syncService.synchronize().subscribe(
          () => {
            // this.loggingInProgress = false;
            this.router.navigate(['/homepage']);
          },
          () => {
            this.snackBar.showSnackBar('An error occurred. Try again.');
            this.loggingInProgress = false;
          }
        );
      },
      () => {
        this.loginForm.get('username').setErrors({ loginFailed: true });
        this.loginForm.get('password').setErrors({ loginFailed: true });
        this.loggingInProgress = false;
      }
    );
  }

}
