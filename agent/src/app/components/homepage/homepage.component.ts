import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { SnackBar } from 'src/app/utils';
import { Accommodation } from 'src/app/models/Accommodation';
import { AccommodationType } from 'src/app/models/AccommodationType';
import { AdditionalService } from 'src/app/models/AdditionalService';
import { AccommodationService } from 'src/app/services/accommodation/accommodation.service';

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
    private snackBar: SnackBar, private accommodationService: AccommodationService) { }

  ngOnInit() {
    this.username = this.authenticationService.getUsername();
    if (!this.username) {
      this.router.navigate(['/']);
    }

    this.accommodations = this.accommodationService.getAccommodations();
    // this.accommodationService.getAccommodations().subscribe(
    //   (data: any) => {
    //     this.accommodations = data;
    //     console.log(data);
    //   }
    // );
    this.accommodationTypes = this.accommodationService.getAccommodationTypes();
    // this.accommodationService.getAccommodationTypes().subscribe(
    //   (types: AccommodationType[]) => {
    //     this.accommodationTypes = types;

    //   }
    // );
    this.additionalServices = this.accommodationService.getAdditionalServices();
    // this.accommodationService.getAdditionalServices().subscribe(
    //   (services: AdditionalService[]) => {
    //     this.additionalServices = services;
    //   }
    // );
  }

  nextStep(accommodation) {
    this.accommodation = accommodation;
    this.selectedIndex += 1;
  }

  previousStep() {
    this.selectedIndex -= 1;
  }

  logout() {
    setTimeout(() => {
      this.authenticationService.removeUserState();
      this.router.navigate(['/']);
      this.snackBar.showSnackBar('Logged out successfully!');
    }, 500);
  }
}
