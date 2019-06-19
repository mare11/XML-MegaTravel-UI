import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpStatus } from 'src/app/utils';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {

  constructor(
    private registrationService: RegistrationService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const tokenKey = 'token';
      const token = params[tokenKey];
      this.registrationService.verifyUser(token).subscribe(
        () => {
          alert('Verified successfully! Please log in to continue browsing our site.');
          this.router.navigate(['/']);
        },
        (error) => {
          let message = '';
          if (error.status === HttpStatus.BAD_REQUEST) {
            message = 'Error! Link has expired!';
          } else if (error.status === HttpStatus.NOT_FOUND) {
            message = 'Error! User is not found!';
          } else if (error.status === HttpStatus.CONFLICT) {
            message = 'Error! User is already verified!';
          } else {
            message = 'Error!';
          }

          alert(message);
          this.router.navigate(['/']);
        }
      );
    });
  }

}
