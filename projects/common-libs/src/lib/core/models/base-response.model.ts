/**
 * BaseResponse
 * @author Ronak Patel.
 * @description
 */
export class BaseResponse<T> {
    /**
     * Count  of base response
     */
    public count?: number;
    /**
     * Body  of base response
     */
    public body: T[];
}
