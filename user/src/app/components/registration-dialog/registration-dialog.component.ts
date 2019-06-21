import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { MatDialogRef } from '@angular/material';
import { RegistrationUser } from 'src/app/models/RegistrationUser';
import { SnackBar } from 'src/app/utils';
import { UserUniqueness } from 'src/app/models/UserUniqueness';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.css']
})
export class RegistrationDialogComponent implements OnInit, OnDestroy {

  passwordMinLength = 8;
  passwordMaxLength = 32;
  usernameMinLength = 5;
  usernameMaxLength = 25;
  registrationForm: FormGroup;
  enterListener: any;

  constructor(
    private registrationService: RegistrationService,
    private dialogRef: MatDialogRef<RegistrationDialogComponent>,
    private formBuilder: FormBuilder, private snackBar: SnackBar) {
    this.enterListener = (event) => {
      if (event.keyCode === 13) {
        this.validateUsernameAndEmail();
      }
    };
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required,
      Validators.minLength(this.usernameMinLength),
      Validators.maxLength(this.usernameMaxLength)]],
      password: ['', [Validators.required,
      Validators.minLength(this.passwordMinLength),
      Validators.maxLength(this.passwordMaxLength)]],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]]
    }, {
        validator: this.mustMatch('password', 'confirmPassword')
      });
    document.addEventListener('keyup', this.enterListener);
  }

  ngOnDestroy(): void {
    document.removeEventListener('keyup', this.enterListener);
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) { return; }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  validateUsernameAndEmail() {
    const usernameControl: AbstractControl = this.registrationForm.get('username');
    const emailControl: AbstractControl = this.registrationForm.get('email');
    const userUniqueness = new UserUniqueness(usernameControl.value, null, emailControl.value);
    this.registrationService.checkuserUniqueness(userUniqueness).subscribe(
      (data) => {
        usernameControl.setErrors(null);
        emailControl.setErrors(null);
      },
      (error) => {
        usernameControl.setErrors({ usernameExists: true });
        emailControl.setErrors({ emailExists: true });
      },
      () => {
        this.registerUserIfValid();
      });
  }

  registerUserIfValid() {
    if (this.registrationForm.valid) {
      const regFormValue = this.registrationForm.value;
      const registrationUser = new RegistrationUser(regFormValue.username, regFormValue.password,
        regFormValue.email, regFormValue.firstName, regFormValue.lastName);

      this.registrationService.registerUser(registrationUser).subscribe(
        () => {
          this.dialogRef.close(registrationUser);
        },
        () => {
          this.snackBar.showSnackBar('An error occurred during registration! Try again...');
        }
      );

    }
  }

}
