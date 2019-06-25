import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { HomepageComponent } from '../homepage/homepage.component';
import { UpdateAccommodation, SnackBar } from 'src/app/utils';
import { MatDialog } from '@angular/material';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { Accommodation } from 'src/app/models/Accommodation';
import { AccommodationService } from 'src/app/services/accommodation/accommodation.service';
import { AdditionalService } from 'src/app/models/AdditionalService';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ReservationCloud } from 'src/app/models/ReservationCloud';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AverageRating } from 'src/app/models/AverageRating';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent implements OnInit, OnChanges {

  constructor(
    private homepageComponent: HomepageComponent, private dialog: MatDialog, private snackBar: SnackBar,
    private accommodationService: AccommodationService, private authenticationService: AuthenticationService,
    private sanitizer: DomSanitizer) { }

  @Input() accommodation: Accommodation;
  @Input() additionalServices: AdditionalService[];
  private username: string;
  mapUrl: SafeResourceUrl;
  average: number;

  reviews: ReservationCloud[];

  ngOnInit() {
    this.username = this.authenticationService.getUsername();
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://maps.google.com/maps?q=' +
      this.accommodation.location.latitude + ', ' +
      this.accommodation.location.longitude +
      '&t=&z=11&ie=UTF8&iwloc=&output=embed');
  }

  ngOnChanges() {
    this.accommodationService.getAccommodationAverageRating(this.accommodation.id).subscribe(
      (data: AverageRating) => {
        this.average = data.averageRating;
      }
    );
  }

  goBack() {
    this.homepageComponent.previousStep();
  }

  openDialog(updateEnum: UpdateAccommodation) {
    const dialogRef = this.dialog.open(UpdateDialogComponent,
      {
        data: {
          update: updateEnum,
          accommodationServices: this.accommodation.additionalServices,
          allServices: this.additionalServices
        },
        disableClose: true,
        autoFocus: true,
        width: '40%'
      });

    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          const update = data;
          if (updateEnum.toString() === 'PERIOD') {
            this.accommodation.periodPrice.push(update);
          }

          if (updateEnum.toString() === 'UNAVAILABILITY') {
            delete update.price;
            this.accommodation.unavailability.push(update);
          }

          if (updateEnum.toString() === 'SERVICE') {
            const services = update.additionalServices;
            this.accommodation.additionalServices = this.additionalServices.filter((service, index) => services[index]);
          }

          // this.accommodationService.updateAccommodation(this.accommodation).subscribe(
          //   () => {
          //     this.snackBar.showSnackBar('Accommodation successfully updated');
          //   },
          //   () => {
          //     this.snackBar.showSnackBar('An error occurred. Try again');
          //   }
          // );
        }
      },
      () => {
        this.snackBar.showSnackBar('An error occurred. Try again');
      }
    );
  }
}
