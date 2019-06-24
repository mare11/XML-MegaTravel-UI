import { Component, OnInit } from '@angular/core';
import { AccommodationSearchResult } from 'src/app/models/accommodation-search-result/accommodation-search-result';
import { ReservationDialogComponent } from '../reservation-dialog/reservation-dialog.component';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { Reservation } from 'src/app/models/reservation/reservation';
import { AppComponent } from 'src/app/app.component';
import { SnackBar } from 'src/app/utils';
import { AccommodationService } from 'src/app/services/accommodation/accommodation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccommodationSearchObject } from 'src/app/models/accommodation-search';
import { SearchService } from 'src/app/services/search/search.service';
import { Location } from 'src/app/models/location/location';

declare let require: any;

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.css']
})
export class AccommodationsComponent implements OnInit {

  private accommodations: Array<AccommodationSearchResult>;
  private array: ArrayConstructor;
  private location: any;
  private checkInDate: Date;
  private checkOutDate: Date;
  private numberOfPersons: number;
  private searchForm: FormGroup;
  private categories: string[] = ['uncategorized', '1 star', '2 stars', '3 stars', '4 stars', '5 stars'];
  private distancesFromLocation: number[] = [1, 3, 5, 10];
  private additionalServices = [];
  private accommodationTypes = [];

  private selectedCategories = [];
  private selectedAdditionalServices = [];
  private selectedAccommodationTypes = [];
  private selectedDistance = null;

  private newLocation: any = {};
  private today: Date;


  constructor(private authenticationService: AuthenticationService,
    private reservationService: ReservationService,
    private accommodationService: AccommodationService,
    private dialog: MatDialog,
    private appComponent: AppComponent,
    private snackBar: SnackBar,
    private formBuilder: FormBuilder,
    private searchService: SearchService) {

    this.array = Array;
  }

  ngOnInit() {
    this.accommodations = JSON.parse(localStorage.getItem("accommodations"));
    this.location = JSON.parse(localStorage.getItem("location"));
    this.checkInDate = JSON.parse(localStorage.getItem("checkInDate"));
    this.checkOutDate = JSON.parse(localStorage.getItem("checkOutDate"));
    this.numberOfPersons = JSON.parse(localStorage.getItem("numberOfPersons"));
    this.accommodationService.getAccommodationTypes().subscribe(
      (data: any) => {
        this.accommodationTypes = data;
      }
    );
    this.accommodationService.getAdditionalServices().subscribe(
      (data: any) => {
        this.additionalServices = data;
      }
    );
    this.today = new Date();
    this.searchForm = this.formBuilder.group({
      location: [this.location.address, Validators.required],
      checkInDate: [this.checkInDate, Validators.required],
      checkOutDate: [this.checkOutDate, Validators.required],
      numberOfPersons: [this.numberOfPersons, Validators.required],
    }, {
        validator: this.checkDates()
      });
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
      this.newLocation.id = null;
      this.newLocation.address = e.suggestion.value;
      this.newLocation.country = e.suggestion.country;
      this.newLocation.city = e.suggestion.city ? e.suggestion.city : e.suggestion.name;
      this.newLocation.latitude = e.suggestion.latlng.lat;
      this.newLocation.longitude = e.suggestion.latlng.lng;
    });

    placesAutocomplete.on('clear', e => {
      this.searchForm.controls.location.setValue('');
    });
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
      } else if (this.getDiferenceInDays(controlStartDate.value, controlEndDate.value) > 30) {
        controlEndDate.setErrors({ daysDifference: true })
      } else {
        controlEndDate.setErrors(null);
      }
    };
  }

  additionalServiceChange(additionalServiceName, event) {
    var status = event.checked;
    if (status) {
      this.selectedAdditionalServices.push(additionalServiceName);
    } else {
      var index = this.selectedAdditionalServices.indexOf(additionalServiceName);
      this.selectedAdditionalServices.splice(index, 1);
    }
  }

  accommodationTypeChange(accommodationType, event) {
    var status = event.checked;
    if (status) {
      this.selectedAccommodationTypes.push(accommodationType);
    } else {
      var index = this.selectedAccommodationTypes.indexOf(accommodationType);
      this.selectedAccommodationTypes.splice(index, 1);
    }
  }

  categoryChange(category, event) {
    var status = event.checked;
    var categoryResult = this.categories.indexOf(category);
    if (status) {
      this.selectedCategories.push(categoryResult);
    } else {
      var index = this.selectedCategories.indexOf(categoryResult);
      this.selectedCategories.splice(index, 1);
    }
  }

  distanceChange(distance) {
    this.selectedDistance = distance;
  }

  search() {
    const searchFormValue = this.searchForm.value;
    const searchObject = new AccommodationSearchObject(this.newLocation, searchFormValue.checkInDate, searchFormValue.checkOutDate, searchFormValue.numberOfPersons, this.selectedAccommodationTypes, this.selectedCategories, this.selectedAdditionalServices, this.selectedDistance);
    if (this.newLocation === {}) {
      this.newLocation = this.location;
    }
    this.searchService.search(searchObject).subscribe(
      (data: Array<AccommodationSearchResult>) => {
        this.accommodationService.changeAccommodations(data);
        this.accommodationService.changeLocation(this.newLocation);
        this.accommodationService.changeCheckInDate(searchFormValue.checkInDate);
        this.accommodationService.changeCheckOutDate(searchFormValue.checkOutDate);
        this.accommodationService.changeNumberOfPersons(searchFormValue.numberOfPersons);
        this.accommodations = data;
        this.location = this.newLocation;
        this.checkInDate = searchFormValue.checkInDate;
        this.checkOutDate = searchFormValue.checkOutDate;
        this.numberOfPersons = searchFormValue.numberOfPersons;
      },
      () => {
        this.snackBar.showSnackBar('An error occurred! Try again...');
      }
    )
  }

  openReservationDialog(accommodation: AccommodationSearchResult) {
    // Check if there is logged in user or not
    // If there is not logged in user, then open him login dialog
    if (!this.authenticationService.getUsername()) {
      this.appComponent.openLoginDialog().afterClosed().subscribe(
        (data) => {
          if (data) {
            this.authenticationService.setUserState(data);
            this.snackBar.showSnackBar('Logged in successfully!');
            this.createReservation(accommodation);
          }
        }
      );
    } else {
      this.createReservation(accommodation);
    }
  }

  createReservation(accommodation: AccommodationSearchResult) {
    const startDate = this.checkInDate;
    const endDate = this.checkOutDate
    const reservation = new Reservation();
    reservation.$accommodationId = accommodation.$id;
    reservation.$userId = this.authenticationService.getId();
    reservation.$startDate = startDate;
    reservation.$endDate = endDate;
    reservation.$price = accommodation.$priceForRequestedPeriod;

    const dialogRef = this.dialog.open(ReservationDialogComponent, {
      data: {
        accommodation,
        startDate,
        endDate
      },
      disableClose: true,
      autoFocus: true,
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(
      (reservationConfirmed) => {
        if (reservationConfirmed) {
          this.reservationService.createReservation(reservation).subscribe(
            () => {
              this.snackBar.showSnackBar('Reservation created successfully!');
            },
            (error: any) => {
              this.snackBar.showSnackBar(error.error.message);
            }
          );
        }
      }
    );
  }
}
