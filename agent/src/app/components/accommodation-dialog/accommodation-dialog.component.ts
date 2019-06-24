import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccommodationService } from 'src/app/services/accommodation/accommodation.service';
import { AccommodationType } from 'src/app/models/AccommodationType';
import { AdditionalService } from 'src/app/models/AdditionalService';
import { Location } from 'src/app/models/Location';

declare var require: any;

@Component({
  selector: 'app-accommodation-dialog',
  templateUrl: './accommodation-dialog.component.html',
  styleUrls: ['./accommodation-dialog.component.css']
})
export class AccommodationDialogComponent implements OnInit {

  accommodationForm: FormGroup;
  accommodationTypes: AccommodationType[];
  additionalServices: AdditionalService[];
  categories = [...Array(6).keys()]; // same as Array.from(Array(6).keys())
  location: Location;

  constructor(
    private dialogRef: MatDialogRef<AccommodationDialogComponent>, private formBuilder: FormBuilder,
    private accommodationService: AccommodationService, @Inject(MAT_DIALOG_DATA) private data: any) {

    this.accommodationTypes = this.data.types;
    this.additionalServices = this.data.services;
  }

  ngOnInit() {
    this.accommodationForm = this.formBuilder.group({
      accommodationType: ['', Validators.required],
      location: ['', Validators.required],
      category: ['', Validators.required],
      numberOfPersons: ['', [Validators.required, Validators.min(1)]],
      defaultPrice: ['', [Validators.required, Validators.min(1)]],
      freeCancellation: [true],
      cancellationDays: ['', Validators.required],
      additionalServices: this.formBuilder.array(this.additionalServices.map(service => this.formBuilder.control(false))),
      description: [''],
    },
      {
        validator: this.customRequiredValidator()
      });

    // address field
    const placesLocation = require('places.js');
    const placesLocationsAutocomplete = placesLocation({
      appId: 'pl14EZX3IQNN',
      apiKey: 'ad1257b86ef3f77014a0b7f168c417f7',
      container: document.querySelector('#location-input')
    });

    placesLocationsAutocomplete.on('change', e => {
      this.location = new Location(e.suggestion.country, e.suggestion.city ? e.suggestion.city : e.suggestion.name,
        e.suggestion.value, e.suggestion.latlng.lat, e.suggestion.latlng.lng);
    });

    placesLocationsAutocomplete.on('clear', e => {
      this.accommodationForm.controls.location.setValue('');
    });
  }

  customRequiredValidator() {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls.cancellationDays;

      if (formGroup.controls.freeCancellation.value && !control.value) {
        control.setErrors({ required: true });
      } else {
        control.setErrors(null);
      }
    };
  }

  createAccommodation() {
    const accommodation = this.accommodationForm.value;
    const choosenServices = this.accommodationForm.controls.additionalServices.value;
    accommodation.additionalServices = this.additionalServices.filter((service, index) => choosenServices[index]);
    accommodation.location = this.location;
    console.log(accommodation);

    this.accommodationService.addAccommodation(accommodation).subscribe(
      (data) => {
        this.dialogRef.close(data);
      }
    );
  }

}
