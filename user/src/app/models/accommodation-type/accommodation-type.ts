export class AccommodationType {
    private id: number;
    private typeName: string;

    constructor($id: number, $typeName: string) {
        this.id = $id;
        this.typeName = $typeName;
    }


    /**
     * Getter $id
     * @return {number}
     */
    public get $id(): number {
        return this.id;
    }

    /**
     * Getter $typeName
     * @return {string}
     */
    public get $typeName(): string {
        return this.typeName;
    }

    /**
     * Setter $id
     * @param {number} value
     */
    public set $id(value: number) {
        this.id = value;
    }

    /**
     * Setter $typeName
     * @param {string} value
     */
    public set $typeName(value: string) {
        this.typeName = value;
    }

}