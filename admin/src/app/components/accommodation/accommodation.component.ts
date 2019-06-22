import { Component, OnInit } from '@angular/core';
import { AccommodationService } from 'src/app/services/accommodation/accommodation.service';
import { AccommodationType } from 'src/app/models/AccommodationType';
import { AdditionalService } from 'src/app/models/AdditionalServices';
import { SnackBar } from 'src/app/utils';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css']
})
export class AccommodationComponent implements OnInit {

  accommodationTypes: AccommodationType[];
  additionalServices: AdditionalService[];

  constructor(private accommodationService: AccommodationService, private snackBar: SnackBar) { }

  ngOnInit() {
    this.accommodationService.getAccommodationTypes().subscribe(
      (data: AccommodationType[]) => {
        this.accommodationTypes = data;
      });

    this.accommodationService.getAdditionalServices().subscribe(
      (data: AdditionalService[]) => {
        this.additionalServices = data;
      });
  }

  addAccommodationType() {
    const typeName = prompt('Please enter accommodation type name:');
    if (typeName) {
      const type = new AccommodationType(typeName);
      this.accommodationService.addAccommodationtype(type).subscribe(
        (data: AccommodationType) => {
          this.snackBar.showSnackBar('Accommodation type successfully created!');
          this.accommodationTypes.push(data);
        },
        (error) => {
          this.snackBar.showSnackBar(error.error.message);
        }
      );
    }
  }

  deleteAccommodationType(type: AccommodationType) {
    if (confirm('Are you sure you want to delete ' + type.typeName + ' ?')) {
      this.accommodationService.deleteAccommodationtype(type).subscribe(
        () => {
          this.accommodationTypes.forEach((element, index) => {
            if (element.id === type.id) {
              this.accommodationTypes.splice(index, 1);
              this.snackBar.showSnackBar('Accommodation type successfully deleted!');
            }
          });
        },
        (error) => {
          this.snackBar.showSnackBar(error.error.message);
        }
      );
    }
  }

  addAdditionalService() {
    const serviceName = prompt('Please enter additional service name:');
    if (serviceName) {
      const service = new AdditionalService(serviceName);
      this.accommodationService.addAdditionalService(service).subscribe(
        (data: AdditionalService) => {
          this.snackBar.showSnackBar('Additional service successfully created!');
          this.additionalServices.push(data);
        },
        (error) => {
          this.snackBar.showSnackBar(error.error.message);
        }
      );
    }
  }

  deleteAdditionalService(service: AdditionalService) {
    if (confirm('Are you sure you want to delete ' + service.additionalServiceName + ' ?')) {
      this.accommodationService.deleteAdditionalService(service).subscribe(
        () => {
          this.additionalServices.forEach((element, index) => {
            if (element.id === service.id) {
              this.additionalServices.splice(index, 1);
              this.snackBar.showSnackBar('Additional service successfully deleted!');
            }
          });
        },
        (error) => {
          this.snackBar.showSnackBar(error.error.message);
        }
      );
    }
  }

}
