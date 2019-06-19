import { Component, OnInit } from '@angular/core';

import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from './services/authentication/authentication.service';
import { Router } from '@angular/router';
import { RegistrationDialogComponent } from './components/registration-dialog/registration-dialog.component';
import { SnackBar } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private username: string;

  constructor(
    private authenticationService: AuthenticationService,
    private dialog: MatDialog, private router: Router, private snackBar: SnackBar) { }

  ngOnInit() {
    this.username = this.authenticationService.getUsername();
    this.authenticationService.onSubject.subscribe(
      () => {
        this.username = this.authenticationService.getUsername();
      }
    );
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent,
      {
        data: undefined,
        disableClose: true,
        autoFocus: true,
        width: '30%'
      });
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.authenticationService.setUserState(data);
          this.router.navigate(['/']);
          this.snackBar.showSnackBar('Logged in successfully!');
        }
      }
    );
  }

  openRegistrationDialog() {
    const dialogRef = this.dialog.open(RegistrationDialogComponent,
      {
        data: undefined,
        disableClose: true,
        autoFocus: true,
        width: '40%'
      });
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          alert('You have successfully registered! Congratulations! Open the email and confirm that it is you!');
          this.router.navigate(['/']);
        }
      }
    );
  }

  logout() {
    setTimeout(() => {
      this.authenticationService.removeUserState();
      this.router.navigate(['/']);
      this.snackBar.showSnackBar('Logged out successfully!');
    }, 500);
  }

}
