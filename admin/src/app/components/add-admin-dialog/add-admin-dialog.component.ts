import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { SnackBar } from 'src/app/utils';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AgentService } from 'src/app/services/agent/agent.service';
import { Admin } from 'src/app/models/Admin';
import { UserUniqueness } from 'src/app/models/UserUniqueness';

@Component({
  selector: 'app-add-admin-dialog',
  templateUrl: './add-admin-dialog.component.html',
  styleUrls: ['./add-admin-dialog.component.css']
})
export class AddAdminDialogComponent implements OnInit, OnDestroy {

  passwordMinLength = 8;
  passwordMaxLength = 32;
  usernameMinLength = 5;
  usernameMaxLength = 25;
  adminForm: FormGroup;
  enterListener: any;

  constructor(private dialogRef: MatDialogRef<AddAdminDialogComponent>,
    private formBuilder: FormBuilder, private snackBar: SnackBar,
    private adminService: AdminService, private agentService: AgentService) { }

  ngOnInit() {
    this.adminForm = this.formBuilder.group({
      username: ['', [Validators.required,
      Validators.minLength(this.usernameMinLength),
      Validators.maxLength(this.usernameMaxLength)]],
      password: ['', [Validators.required,
      Validators.minLength(this.passwordMinLength),
      Validators.maxLength(this.passwordMaxLength)]],
      confirmPassword: ['', Validators.required],
    }, {
        validator: this.mustMatch('password', 'confirmPassword')
      });
    document.addEventListener('keyup', this.enterListener);
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

  ngOnDestroy() {
    document.removeEventListener('keyup', this.enterListener);
  }

  validateByUsername() {
    const usernameControl: AbstractControl = this.adminForm.get('username');
    const userUniqueness = new UserUniqueness(usernameControl.value, null, null);
    this.agentService.checkuserUniqueness(userUniqueness).subscribe(
      (data) => {
        usernameControl.setErrors(null);
      },
      (error) => {
        usernameControl.setErrors({ usernameExists: true });
      },
      () => {
        this.createAdminIfValid();
      });
  }

  createAdminIfValid() {
    if (this.adminForm.valid) {
      const adminFormValue = this.adminForm.value;
      const admin = new Admin(adminFormValue.username, adminFormValue.password);

      this.adminService.addAdmin(admin).subscribe(
        (data) => {
          this.dialogRef.close(data);
        },
        () => {
          this.snackBar.showSnackBar('An error occurred! Try again...');
        }
      );
    }
  }
}
