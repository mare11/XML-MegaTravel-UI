import { Component } from '@angular/core';
import { AccommodationSearchResult } from 'src/app/models/accommodation-search-result/accommodation-search-result';
import { ReservationDialogComponent } from '../reservation-dialog/reservation-dialog.component';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { Reservation } from 'src/app/models/reservation/reservation';
import { AppComponent } from 'src/app/app.component';
import { SnackBar } from 'src/app/utils';
import { AccommodationService } from 'src/app/services/accommodation/accommodation.service';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.css']
})
export class AccommodationsComponent {

  private accommodations: Array<AccommodationSearchResult>;
  private array: ArrayConstructor;

  constructor(private authenticationService: AuthenticationService,
              private reservationService: ReservationService,
              private accommodationService: AccommodationService,
              private dialog: MatDialog,
              private appComponent: AppComponent,
              private snackBar: SnackBar) {

    this.accommodations = this.accommodationService.getAccommodations();
    this.array = Array;
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
    const startDate = '2019-10-03';
    const endDate = '2019-10-10';
    const reservation = new Reservation();
    reservation.$accommodationId = accommodation.$id;
    reservation.$userId = this.authenticationService.getId();
    reservation.$startDate = startDate;
    reservation.$endDate = endDate;

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
