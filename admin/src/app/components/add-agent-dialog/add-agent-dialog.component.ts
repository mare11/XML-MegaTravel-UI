import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { SnackBar } from 'src/app/utils';
import { AgentService } from 'src/app/services/agent/agent.service';
import { Agent } from 'src/app/models/Agent';
import { UserUniqueness } from 'src/app/models/UserUniqueness';

@Component({
  selector: 'app-add-agent-dialog',
  templateUrl: './add-agent-dialog.component.html',
  styleUrls: ['./add-agent-dialog.component.css']
})
export class AddAgentDialogComponent implements OnInit, OnDestroy {

  passwordMinLength = 8;
  passwordMaxLength = 32;
  usernameMinLength = 5;
  usernameMaxLength = 25;
  agentForm: FormGroup;
  enterListener: any;

  constructor(private dialogRef: MatDialogRef<AddAgentDialogComponent>,
    private formBuilder: FormBuilder, private snackBar: SnackBar,
    private agentService: AgentService) { }

  ngOnInit() {
    this.agentForm = this.formBuilder.group({
      username: ['', [Validators.required,
      Validators.minLength(this.usernameMinLength),
      Validators.maxLength(this.usernameMaxLength)]],
      password: ['', [Validators.required,
      Validators.minLength(this.passwordMinLength),
      Validators.maxLength(this.passwordMaxLength)]],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
      address: ['', Validators.required],
      bussinesID: ['', Validators.required]
    }, {
        validatior: this.mustMatch('password', 'confirmPassword')
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
    const usernameControl: AbstractControl = this.agentForm.get('username');
    const emailControl: AbstractControl = this.agentForm.get('email');
    const userUniqueness = new UserUniqueness(usernameControl.value, null, emailControl.value);
    this.agentService.checkuserUniqueness(userUniqueness).subscribe(
      (data) => {
        usernameControl.setErrors(null);
        emailControl.setErrors(null);
      },
      (error) => {
        usernameControl.setErrors({ usernameExists: true });
        emailControl.setErrors({ emailExists: true });
      },
      () => {
        this.createAdminIfValid();
      });
  }

  createAdminIfValid() {
    if (this.agentForm.valid) {
      const agentFormValue = this.agentForm.value;
      const agent = new Agent(agentFormValue.username, agentFormValue.password,
        agentFormValue.email, agentFormValue.firstName, agentFormValue.lastName, agentFormValue.address, agentFormValue.bussinesID);

      this.agentService.addAgent(agent).subscribe(
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
