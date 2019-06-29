import { Component, OnInit, Input } from '@angular/core';
import { AccommodationService } from 'src/app/services/accommodation/accommodation.service';
import { AccommodationDialogComponent } from '../accommodation-dialog/accommodation-dialog.component';
import { MatDialog } from '@angular/material';
import { HomepageComponent } from '../homepage/homepage.component';
import { Accommodation } from 'src/app/models/Accommodation';
import { AccommodationType } from 'src/app/models/AccommodationType';
import { AdditionalService } from 'src/app/models/AdditionalService';
import { SnackBar } from 'src/app/utils';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.css']
})
export class AccommodationsComponent implements OnInit {

  array: ArrayConstructor;

  constructor(
    private accommodationService: AccommodationService, private dialog: MatDialog,
    private homepageComponent: HomepageComponent, private snackBar: SnackBar) {
  }

  @Input() accommodations: Accommodation[];
  @Input() accommodationTypes: AccommodationType[];
  @Input() additionalServices: AdditionalService[];

  ngOnInit() {
    this.array = Array;
  }

  openDialog() {
    const dialogRef = this.dialog.open(AccommodationDialogComponent,
      {
        data: {
          types: this.accommodationTypes,
          services: this.additionalServices
        },
        disableClose: true,
        autoFocus: true,
        width: '40%'
      });

    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.accommodations.push(data);
          this.snackBar.showSnackBar('Accommodation successfully created!');
        }
      },
      () => {
        this.snackBar.showSnackBar('An error occurred. Try again.');
      }
    );
  }

  showDetails(accommodation) {
    this.homepageComponent.nextStep(accommodation);
  }

}
