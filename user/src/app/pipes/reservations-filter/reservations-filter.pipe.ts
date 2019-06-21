import { Pipe, PipeTransform } from '@angular/core';
import { ReservationState } from 'src/app/utils';

@Pipe({
  name: 'reservationsFilter'
})
export class ReservationsFilterPipe implements PipeTransform {

  transform(reservations: [], state: ReservationState): any {

    if (!reservations || reservations.length === 0) {
      return reservations;
    }

    return reservations.filter((reservation: any) => reservation.state === state);
  }
}
