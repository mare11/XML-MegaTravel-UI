import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { SnackBar } from 'src/app/utils';
import { Accommodation } from 'src/app/models/Accommodation';
import { AccommodationType } from 'src/app/models/AccommodationType';
import { AdditionalService } from 'src/app/models/AdditionalService';
import { AccommodationService } from 'src/app/services/accommodation/accommodation.service';
import { SynchronizationService } from 'src/app/services/synchronization/synchronization.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  username: string;
  selectedIndex = 0;
  accommodation: Accommodation;

  accommodations: Accommodation[];
  accommodationTypes: AccommodationType[];
  additionalServices: AdditionalService[];

  constructor(
    private authenticationService: AuthenticationService, private router: Router,
    private snackBar: SnackBar, private accommodationService: AccommodationService,
    private syncService: SynchronizationService) { }

  ngOnInit() {
    this.username = this.authenticationService.getUsername();
    if (!this.username) {
      this.router.navigate(['/']);
    }

    this.accommodationService.getAccommodations().subscribe(
      (accommodations: Accommodation[]) => {
        this.accommodations = accommodations;
      }
    );
    this.accommodationService.getAccommodationTypes().subscribe(
      (types: AccommodationType[]) => {
        this.accommodationTypes = types;
      }
    );
    this.accommodationService.getAdditionalServices().subscribe(
      (services: AdditionalService[]) => {
        this.additionalServices = services;
      }
    );
  }

  nextStep(accommodation) {
    this.accommodation = accommodation;
    this.selectedIndex += 1;
  }

  previousStep() {
    this.selectedIndex -= 1;
  }

  logout() {
    this.snackBar.showSnackBar('Desynchronizing data, please wait...');
    this.syncService.desynchronize().subscribe(
      () => {
        this.authenticationService.removeUserState();
        this.router.navigate(['/']);
        this.snackBar.showSnackBar('Logged out successfully!');
      },
      () => {
        this.snackBar.showSnackBar('An error occurred. Try again.');
      }
    );
  }
}
