
import { BaseProductViewModel } from "./baseProductViewModel";

export class CreateProductRequestModel extends BaseProductViewModel{
    /**
     *
     */
    constructor(productName:string, unitPrice:number, categoryId:number) {
        super(productName,unitPrice,categoryId);

    }
}