export class Location {
    private id: number;
    private country: string;
    private city: string;
    private address: string;
    private latitude: number;
    private longitude: number;

    constructor($id: number, $country: string, $city: string, $address: string, $latitude: number, $longitude: number) {
        this.id = $id;
        this.country = $country;
        this.city = $city;
        this.address = $address;
        this.latitude = $latitude;
        this.longitude = $longitude;
    }


    /**
     * Getter $id
     * @return {number}
     */
    public get $id(): number {
        return this.id;
    }

    /**
     * Getter $country
     * @return {string}
     */
    public get $country(): string {
        return this.country;
    }

    /**
     * Getter $city
     * @return {string}
     */
    public get $city(): string {
        return this.city;
    }

    /**
     * Getter $address
     * @return {string}
     */
    public get $address(): string {
        return this.address;
    }

    /**
     * Getter $latitude
     * @return {number}
     */
    public get $latitude(): number {
        return this.latitude;
    }

    /**
     * Getter $longitude
     * @return {number}
     */
    public get $longitude(): number {
        return this.longitude;
    }

    /**
     * Setter $id
     * @param {number} value
     */
    public set $id(value: number) {
        this.id = value;
    }

    /**
     * Setter $country
     * @param {string} value
     */
    public set $country(value: string) {
        this.country = value;
    }

    /**
     * Setter $city
     * @param {string} value
     */
    public set $city(value: string) {
        this.city = value;
    }

    /**
     * Setter $address
     * @param {string} value
     */
    public set $address(value: string) {
        this.address = value;
    }

    /**
     * Setter $latitude
     * @param {number} value
     */
    public set $latitude(value: number) {
        this.latitude = value;
    }

    /**
     * Setter $longitude
     * @param {number} value
     */
    public set $longitude(value: number) {
        this.longitude = value;
    }

}
