import { BaseCategoryViewModel } from "./categories/baseCategoryViewModel";

export class CreateCategoryRequestModel extends BaseCategoryViewModel{
    constructor(categoryName:string,description:string) {
        super(categoryName,description);
        
    }
}