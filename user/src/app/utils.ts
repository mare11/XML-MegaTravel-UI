import { MatSnackBar } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule()
export class SnackBar {

    constructor(private snackBar: MatSnackBar) { }

    showSnackBar(message: string) {
        if (!message) {
            return;
        }
        const snackBarRef = this.snackBar.open(message, 'Dissmiss', { duration: 4000 });
        snackBarRef.onAction().subscribe(
            () => {
                snackBarRef.dismiss();
            }
        );
    }
}

export enum HttpStatus {
    OK = 200,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    CONFLICT = 409
}

export enum ReservationState {
    PASSED,
    IN_PROGRESS,
    ACTIVE
}

export enum DirectionEnum {
    AGENT_TO_USER,
    USER_TO_AGENT
}

export function sortArray(array: any, sortBy: string, asc: boolean) {
    if (!Array.isArray(array) || array.length === 0) {
        return [];
    }
    array.sort((a: any, b: any) => {
        let val1 = a[sortBy];
        let val2 = b[sortBy];
        if (typeof a[sortBy] === 'string') {
            val1 = val1.toLowerCase();
            val2 = val2.toLowerCase();
        }
        if (val1 < val2) {
            return asc ? -1 : 1;
        } else if (val1 > val2) {
            return asc ? 1 : -1;
        } else {
            return 0;
        }
    });
    return array;
}
