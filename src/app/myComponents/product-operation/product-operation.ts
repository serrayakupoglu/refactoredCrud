import { Component,signal,inject,OnInit } from '@angular/core';
import { AbstractControl,ReactiveFormsModule } from '@angular/forms';
import { ProductApi } from '../../DataAccess/product-api';
import { ProductResponseModel } from '../../models/products/productResponseModel';
import { createProductForm,toCreateProductRequest } from '../../Validations/products/CreateProductFormFactor';
import { UpdateProductForm , toUpdateProductRequest, updateProductForm} from '../../Validations/products/UpdateProductFormFactory';
@Component({
  selector: 'app-product-operation',
  imports: [ReactiveFormsModule],
  templateUrl: './product-operation.html',
  styleUrl: './product-operation.css',
})
export class ProductOperation implements OnInit{
  private productApi = inject(ProductApi);
  protected products = signal<ProductResponseModel[]>([]); 
  protected selectedProduct = signal<ProductResponseModel|null>(null);

  protected createForm = createProductForm();
  protected updateForm = updateProductForm();

  private async refreshProducts():Promise<void>{
      try {
        const values = await this.productApi.getAll();
        this.products.set(values); 
      } catch (error) {
        console.log("Product listesi alınamadı",error);
        
      }
    }
  
    async ngOnInit():Promise<void> {
      await this.refreshProducts();
        
    }
  
    //create işlemleri 
    async onCreate():Promise<void>{
      if(this.createForm.invalid){
        this.createForm.markAllAsTouched();
        return;
      }
  
      const req = toCreateProductRequest(this.createForm); 
      await this.productApi.create(req); 
      this.createForm.reset();
      await this.refreshProducts(); 
    }
  
    //update işlemleri 
    startUpdate(cat:ProductResponseModel){
      this.selectedProduct.set(cat); 
  
      this.updateForm.patchValue({
        id:cat.id,
        name:cat.productName,
        unitPrice:cat.unitPrice,
        categoryId:cat.categoryId
      },
      {emitEvent:false}
    );
    }
    cancelUpdate(){
      this.selectedProduct.set(null); 
      this.updateForm.reset({id:0,name:'',unitPrice:0, categoryId:0}); 
    }
  
    async onUpdate(){
      if(this.updateForm.invalid){
        this.updateForm.markAllAsTouched();
        return;
      }
      const req = toUpdateProductRequest(this.updateForm);
      await this.productApi.update(req); 
      this.cancelUpdate();
      await this.refreshProducts(); 
    }
  
    //Delete 
    async onDelete(id:number):Promise<void>{
      const confirmDelete = window.confirm(`Id'si ${id} olan ürünü silmek istediğinize emin misiniz`); 
      if(!confirmDelete) return;
  
      try {
        const message = await this.productApi.deleteById(id);
        console.log('Delete mesajı', message); 
        this.products.update((x)=>x.filter((c)=>c.id!==id)); 
        const selected = this.selectedProduct();
  
        if(selected && selected.id == id){
          this.selectedProduct.set(null);
        }
      } catch (error) {
        console.log(error);     
      }
    }
  
    protected labels : Record<string,string> = {
      name:'Ürün Adı',
      unitPrice: 'Fiyatı',
      categoryId:'Kategori numarası',
      id:'Id',
    }; 
  
    protected getErrorMessage(control: AbstractControl|null,label='Bu alan'):string|null{
      if(!control || (!control.touched && control.dirty)||!control.invalid) return null; 
      else if (control.hasError('required')) return `${label} zorunludur.`;
  
      else if(control.hasError('minLength')){
        const e = control.getError('minLength'); 
  
        return `${label} en az ${e.requiredlength} karakter olmalıdır`; 
  
      }
      else if(control.hasError('maxLength')){
        const e = control.getError('maxLength'); 
  
        return `${label} en fazla ${e.requiredlength} karakter olmalıdır`; 
  
      }
      return `${label} geçersiz`;
    }
  
    protected getErrorMessageByName(form:{controls:Record<string,AbstractControl>}, controlName:string):string|null{
      const control = form.controls[controlName]; 
      const label = this.labels[controlName] ?? controlName; 
  
      return this.getErrorMessage(control,label); 
    }
}

