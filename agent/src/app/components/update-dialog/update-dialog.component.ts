import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UpdateAccommodation } from 'src/app/utils';
import { AdditionalService } from 'src/app/models/AdditionalService';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {

  update: UpdateAccommodation;
  updateForm: FormGroup;
  minDate: Date;
  accommodationServices: AdditionalService[];
  allServices: AdditionalService[];

  constructor(
    private dialogRef: MatDialogRef<UpdateDialogComponent>, private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any) {

    this.update = this.data.update;
    this.accommodationServices = this.data.accommodationServices;
    this.allServices = this.data.allServices;
    this.minDate = new Date();
  }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      additionalServices: this.formBuilder.array(this.allServices.map(service =>
        this.formBuilder.control(this.alreadyHasService(service))))
    },
      {
        validator: [this.customRequiredValidator(), this.checkDates()]
      });
  }

  alreadyHasService(service): boolean {
    for (const s of this.accommodationServices) {
      if (s.additionalServiceName === service.additionalServiceName) {
        return true;
      }
    }
    return false;
  }

  customRequiredValidator() {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls.price;

      if (this.update.toString() === 'PERIOD' && !control.value) {
        control.setErrors({ required: true });
      } else {
        control.setErrors(null);
      }
    };
  }

  checkDates() {
    return (formGroup: FormGroup) => {
      const controlStartDate = formGroup.controls.startDate;
      const controlEndDate = formGroup.controls.endDate;

      if (controlStartDate.value >= controlEndDate.value) {
        controlEndDate.setErrors({ minDate: true });
      } else {
        controlEndDate.setErrors(null);
      }
    };
  }

}
