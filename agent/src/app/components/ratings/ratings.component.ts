import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AccommodationService } from 'src/app/services/accommodation/accommodation.service';
import { ReservationCloud } from 'src/app/models/ReservationCloud';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit, OnChanges {

  @Input() accommodationId: number;
  reviews: ReservationCloud[];

  constructor(private accommodationService: AccommodationService) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.accommodationService.getAccommodationRatings(this.accommodationId).subscribe(
      (data: ReservationCloud[]) => {
        this.reviews = data;
        this.reviews.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : (b.timestamp > a.timestamp) ? -1 : 0);
      }
    );
  }

}
