import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SearchService } from 'src/app/services/search/search.service';
import { AccommodationSearchObject } from 'src/app/models/accommodation-search';
import { SnackBar } from 'src/app/utils';
import { Router } from '@angular/router';
import { AccommodationSearchResult } from 'src/app/models/accommodation-search-result/accommodation-search-result';
import { AccommodationService } from 'src/app/services/accommodation/accommodation.service';

declare let require: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, AfterViewInit {

  private searchForm: FormGroup;
  private location: any = {};
  private today: Date;
  searchInProgress = false;

  constructor(private formBuilder: FormBuilder,
              private searchService: SearchService, private snackBar: SnackBar,
              private router: Router, private accommodationService: AccommodationService) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      location: ['', Validators.required],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      numberOfPersons: ['', Validators.required]
    }, {
        validator: this.checkDates()
      });
    this.today = new Date();
  }

  getDiferenceInDays(startDate: string, endDate: string): number {
    return (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24);
  }

  checkDates() {
    return (formGroup: FormGroup) => {
      const controlStartDate = formGroup.controls.checkInDate;
      const controlEndDate = formGroup.controls.checkOutDate;

      if (controlStartDate.value >= controlEndDate.value) {
        controlEndDate.setErrors({ minDate: true });
      } else if (this.getDiferenceInDays(controlStartDate.value, controlEndDate.value) >= 30) {
        controlEndDate.setErrors({ daysDifference: true })
      } else {
        controlEndDate.setErrors(null);
      }
    };
  }

  ngAfterViewInit() {
    const places = require('places.js');
    const placesAutocomplete = places({
      appId: 'pl14EZX3IQNN',
      apiKey: 'ad1257b86ef3f77014a0b7f168c417f7',
      container: document.querySelector('#location-input')
    }).configure({
      type: 'city',
    });

    placesAutocomplete.on('change', e => {
      this.location.id = null;
      this.location.address = e.suggestion.value;
      this.location.country = e.suggestion.country;
      this.location.city = e.suggestion.city ? e.suggestion.city : e.suggestion.name;
      this.location.latitude = e.suggestion.latlng.lat;
      this.location.longitude = e.suggestion.latlng.lng;
    });

    placesAutocomplete.on('clear', e => {
      this.searchForm.controls.location.setValue('');
    });
  }

  search() {
    this.searchInProgress = true;
    const searchFormValue = this.searchForm.value;
    const searchObject = new AccommodationSearchObject(this.location, searchFormValue.checkInDate, searchFormValue.checkOutDate, searchFormValue.numberOfPersons, null, null, null, null);
    this.searchService.search(searchObject).subscribe(
      (data: Array<AccommodationSearchResult>) => {
        this.accommodationService.changeAccommodations(data);
        this.accommodationService.changeLocation(this.location);
        this.accommodationService.changeCheckInDate(searchFormValue.checkInDate);
        this.accommodationService.changeCheckOutDate(searchFormValue.checkOutDate);
        this.accommodationService.changeNumberOfPersons(searchFormValue.numberOfPersons);
        this.searchInProgress = false;
        this.router.navigate(['/accommodations']);
      },
      () => {
        this.searchInProgress = false;
        this.snackBar.showSnackBar('An error occurred! Try again...');
      }
    )
  }

}
