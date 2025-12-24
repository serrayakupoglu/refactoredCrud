import { FormGroup } from "@angular/forms";
import { CreateProductRequestModel } from "../../models/products/createProductRequestModel";
import { baseProductForm } from "./BaseProductFormFactory";

export type CreateProductForm  = FormGroup<ReturnType<typeof baseProductForm>>; 

export function createProductForm(): CreateProductForm{
    return new FormGroup(baseProductForm());

}

export function toCreateProductRequest(form: CreateProductForm): CreateProductRequestModel{
    return{
        productName:form.controls.name.value,
        unitPrice:form.controls.unitPrice.value,
        categoryId:form.controls.categoryId.value,

    };
}
