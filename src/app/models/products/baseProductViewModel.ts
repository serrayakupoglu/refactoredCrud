
export abstract class BaseProductViewModel{
    productName:string;
    unitPrice:number; 
    categoryId: number;

    constructor(productName:string,unitPrice:number,categoryId:number) {
        this.categoryId=categoryId;
        this.unitPrice=unitPrice;
        this.productName=productName;
        
    }

}