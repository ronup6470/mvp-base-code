/**
 * Holds Tag info.
 */
export class Tag {
    /** 
     * Holds `id` of tag.
     */
    public id: string;

    /** 
     * Holds `name` of tag.
     */
    public name: string;

    constructor(
        id: string,
        name: string
    ) {
        this.id = id;
        this.name = name;
    }
}
