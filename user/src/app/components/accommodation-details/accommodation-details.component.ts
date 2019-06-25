import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AccommodationService } from 'src/app/services/accommodation/accommodation.service';
import { AccommodationSearchResult } from 'src/app/models/accommodation-search-result/accommodation-search-result';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { SnackBar } from 'src/app/utils';
import { ReservationCloud } from 'src/app/models/ReservationCloud';
import { AverageRating } from 'src/app/models/AverageRating';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent implements OnInit {

  accommodation: any;
  mapUrl: SafeResourceUrl;
  reviews: ReservationCloud[];
  average: number;

  constructor(
    private route: ActivatedRoute, private accommodationService: AccommodationService,
    private sanitizer: DomSanitizer, private snackBar: SnackBar, private router: Router) { }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if (!isNaN(id)) {
      this.accommodationService.getAccommodation(id).subscribe(
        (data) => {
          this.accommodationService.getAccommodationRatings(id).subscribe(
            (revs: ReservationCloud[]) => {
              this.reviews = revs;
              this.reviews.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : (b.timestamp > a.timestamp) ? -1 : 0);
            }
          );
          this.accommodationService.getAccommodationAverageRating(id).subscribe(
            (avg: AverageRating) => {
              this.average = avg.averageRating;
            }
          );
          this.accommodation = data;
          this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            'https://maps.google.com/maps?q=' +
            this.accommodation.location.latitude + ', ' +
            this.accommodation.location.longitude +
            '&t=&z=11&ie=UTF8&iwloc=&output=embed');
        },
        (error) => {
          this.snackBar.showSnackBar(error.error.message);
          this.router.navigate(['/accommodations']);
        }
      );
    }
    // this.router.navigate(['/accommodations']);
  }

}
