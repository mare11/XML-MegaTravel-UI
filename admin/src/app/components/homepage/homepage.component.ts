import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { SnackBar } from 'src/app/utils';
import { MatDialog } from '@angular/material';
import { AddAdminDialogComponent } from '../add-admin-dialog/add-admin-dialog.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  username: string;

  constructor(private authenticationService: AuthenticationService,
    private router: Router, private snackBar: SnackBar,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.username = this.authenticationService.getUsername();
    if (!this.username) {
      this.router.navigate(['/']);
    }
  }

  logout() {
    setTimeout(() => {
      this.authenticationService.removeUserState();
      this.router.navigate(['/']);
      this.snackBar.showSnackBar('Logged out successfully!');
    }, 500);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddAdminDialogComponent,
      {
        data: undefined,
        disableClose: true,
        autoFocus: true,
        width: '40%'
      });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.snackBar.showSnackBar('Admin successfuly created');
        }
      },
      () => {
        this.snackBar.showSnackBar('An error occurred. Try again');
      }
    );
  }

}
