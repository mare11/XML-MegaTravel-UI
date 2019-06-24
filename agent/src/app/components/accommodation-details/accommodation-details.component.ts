import { Component, OnInit, Input } from '@angular/core';
import { HomepageComponent } from '../homepage/homepage.component';
import { UpdateAccommodation, SnackBar } from 'src/app/utils';
import { MatDialog } from '@angular/material';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { Accommodation } from 'src/app/models/Accommodation';
import { AccommodationService } from 'src/app/services/accommodation/accommodation.service';
import { AdditionalService } from 'src/app/models/AdditionalService';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent implements OnInit {

  constructor(
    private homepageComponent: HomepageComponent, private dialog: MatDialog, private snackBar: SnackBar,
    private accommodationService: AccommodationService) { }

  @Input() accommodation: Accommodation;
  @Input() additionalServices: AdditionalService[];

  ngOnInit() {
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
          let update = data;
          if (updateEnum.toString() === 'PERIOD') {
            update = this.formatDates(update);
            this.accommodation.periodPrice.push(update);
          }

          if (updateEnum.toString() === 'UNAVAILABILITY') {
            update = this.formatDates(update);
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

  formatDates(update) {
    const startDate = update.startDate;
    const endDate = update.endDate;
    update.startDate = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate(),
      startDate.getUTCHours(), startDate.getUTCMinutes(), startDate.getUTCSeconds())).toISOString().split('T')[0];
    update.endDate = new Date(Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate(),
      endDate.getUTCHours(), endDate.getUTCMinutes(), endDate.getUTCSeconds())).toISOString().split('T')[0];

    return update;
  }

}
