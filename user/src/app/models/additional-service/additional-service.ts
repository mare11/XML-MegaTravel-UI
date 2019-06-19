export class AdditionalService {
    private id: number;
    private additionalServiceName: string;

    constructor($id: number, $additionalServiceName: string) {
        this.id = $id;
        this.additionalServiceName = $additionalServiceName;
    }

    /**
     * Getter $id
     * @return {number}
     */
    public get $id(): number {
        return this.id;
    }

    /**
     * Getter $additionalServiceName
     * @return {string}
     */
    public get $additionalServiceName(): string {
        return this.additionalServiceName;
    }

    /**
     * Setter $id
     * @param {number} value
     */
    public set $id(value: number) {
        this.id = value;
    }

    /**
     * Setter $additionalServiceName
     * @param {string} value
     */
    public set $additionalServiceName(value: string) {
        this.additionalServiceName = value;
    }
}