import { AccommodationType } from '../accommodation-type/accommodation-type';
import { AdditionalService } from '../additional-service/additional-service';
import { Location } from '../location/location';
import { Unavailability } from '../Unavailability';

export class AccommodationSearchResult {
    private id: number;
    private accommodationType: AccommodationType;
    private category: number;
    private additionalServices: AdditionalService[];
    private freeCancellation: boolean;
    private cancellationDays: number;
    private description: string;
    private images: string[];
    private numberOfPersons: number;
    private location: Location;
    private priceForRequestedPeriod: number;
    private distance: number;
    private averageRating: number;
    private unavailability: Unavailability;


    constructor($id: number, $accommodationType: AccommodationType, $category: number, $additionalServices: AdditionalService[], $freeCancellation: boolean, $cancellationDays: number, $description: string, $images: string[], $numberOfPersons: number, $location: Location, $priceForRequestedPeriod: number, $distance: number, $averageRating: number) {
        this.id = $id;
        this.accommodationType = $accommodationType;
        this.category = $category;
        this.additionalServices = $additionalServices;
        this.freeCancellation = $freeCancellation;
        this.cancellationDays = $cancellationDays;
        this.description = $description;
        this.images = $images;
        this.numberOfPersons = $numberOfPersons;
        this.location = $location;
        this.priceForRequestedPeriod = $priceForRequestedPeriod;
        this.distance = $distance;
        this.averageRating = $averageRating;
    }


    /**
     * Getter $id
     * @return {number}
     */
    public get $id(): number {
        return this.id;
    }

    /**
     * Getter $accommodationType
     * @return {AccommodationType}
     */
    public get $accommodationType(): AccommodationType {
        return this.accommodationType;
    }

    /**
     * Getter $category
     * @return {number}
     */
    public get $category(): number {
        return this.category;
    }

    /**
     * Getter $additionalServices
     * @return {AdditionalService[]}
     */
    public get $additionalServices(): AdditionalService[] {
        return this.additionalServices;
    }

    /**
     * Getter $freeCancellation
     * @return {boolean}
     */
    public get $freeCancellation(): boolean {
        return this.freeCancellation;
    }

    /**
     * Getter $cancellationDays
     * @return {number}
     */
    public get $cancellationDays(): number {
        return this.cancellationDays;
    }

    /**
     * Getter $description
     * @return {string}
     */
    public get $description(): string {
        return this.description;
    }

    /**
     * Getter $images
     * @return {string[]}
     */
    public get $images(): string[] {
        return this.images;
    }

    /**
     * Getter $numberOfPersons
     * @return {number}
     */
    public get $numberOfPersons(): number {
        return this.numberOfPersons;
    }

    /**
     * Getter $location
     * @return {Location}
     */
    public get $location(): Location {
        return this.location;
    }

    /**
     * Getter $priceForRequestedPeriod
     * @return {number}
     */
    public get $priceForRequestedPeriod(): number {
        return this.priceForRequestedPeriod;
    }

    /**
     * Getter $distance
     * @return {number}
     */
    public get $distance(): number {
        return this.distance;
    }

    /**
     * Getter $averageRating
     * @return {number}
     */
    public get $averageRating(): number {
        return this.averageRating;
    }

    /**
     * Setter $id
     * @param {number} value
     */
    public set $id(value: number) {
        this.id = value;
    }

    /**
     * Setter $accommodationType
     * @param {AccommodationType} value
     */
    public set $accommodationType(value: AccommodationType) {
        this.accommodationType = value;
    }

    /**
     * Setter $category
     * @param {number} value
     */
    public set $category(value: number) {
        this.category = value;
    }

    /**
     * Setter $additionalServices
     * @param {AdditionalService[]} value
     */
    public set $additionalServices(value: AdditionalService[]) {
        this.additionalServices = value;
    }

    /**
     * Setter $freeCancellation
     * @param {boolean} value
     */
    public set $freeCancellation(value: boolean) {
        this.freeCancellation = value;
    }

    /**
     * Setter $cancellationDays
     * @param {number} value
     */
    public set $cancellationDays(value: number) {
        this.cancellationDays = value;
    }

    /**
     * Setter $description
     * @param {string} value
     */
    public set $description(value: string) {
        this.description = value;
    }

    /**
     * Setter $images
     * @param {string[]} value
     */
    public set $images(value: string[]) {
        this.images = value;
    }

    /**
     * Setter $numberOfPersons
     * @param {number} value
     */
    public set $numberOfPersons(value: number) {
        this.numberOfPersons = value;
    }

    /**
     * Setter $location
     * @param {Location} value
     */
    public set $location(value: Location) {
        this.location = value;
    }

    /**
     * Setter $priceForRequestedPeriod
     * @param {number} value
     */
    public set $priceForRequestedPeriod(value: number) {
        this.priceForRequestedPeriod = value;
    }

    /**
     * Setter $distance
     * @param {number} value
     */
    public set $distance(value: number) {
        this.distance = value;
    }

    /**
     * Setter $averageRating
     * @param {number} value
     */
    public set $averageRating(value: number) {
        this.averageRating = value;
    }

}
