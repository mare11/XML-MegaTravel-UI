import { Component, OnInit } from '@angular/core';
import { AccommodationService } from 'src/app/services/accommodation/accommodation.service';
import { ReservationCloud } from 'src/app/models/ReservationCloud';
import { SnackBar } from 'src/app/utils';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {

  reviews: ReservationCloud[];

  constructor(private accommodationService: AccommodationService, private snackBar: SnackBar) { }

  ngOnInit() {
    this.accommodationService.getUnpublishedReviews().subscribe(
      (data: ReservationCloud[]) => {
        this.reviews = data;
        this.reviews.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : (b.timestamp > a.timestamp) ? -1 : 0);
      }
    );
  }

  publishComment(review) {
    this.accommodationService.publishComment(review.id).subscribe(
      () => {
        this.reviews.splice(this.reviews.indexOf(review), 1);
        this.snackBar.showSnackBar('Comment successfully published!');
      },
      (error) => {
        this.snackBar.showSnackBar(error.error.message);
      }
    );
  }

}
