import { Component, OnInit, Input } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { SnackBar} from 'src/app/utils';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-user-single-reservation',
  templateUrl: './user-single-reservation.component.html',
  styleUrls: ['./user-single-reservation.component.css']
})
export class UserSingleReservationComponent implements OnInit {

  @Input() public reservation: any;
  private array: ArrayConstructor;

  constructor(
    private reservationServce: ReservationService,
    private snackBar: SnackBar,
    private userProfileComponent: UserProfileComponent) { }

  ngOnInit() {
    this.array = Array;
  }

  cancelReservation(reservation: any) {
    if (confirm('Are you sure you want to cancel this reservation?')) {
      this.reservationServce.cancelReservation(reservation.id).subscribe(
        () => {
          this.snackBar.showSnackBar('Reservation is canceled successfully!');
          this.userProfileComponent.removeReservation(reservation.id);
        },
        (error) => {
          this.snackBar.showSnackBar(error.error.message);
        }
      );
    }
  }
}
