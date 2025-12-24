import { Component,signal,inject,OnInit } from '@angular/core';
import { AbstractControl,ReactiveFormsModule } from '@angular/forms';
import { CategoryApi } from '../../DataAccess/category-api';
import { CategoryResponseModel } from '../../models/categories/categoryResponseModel';
import { createCategoryForm, toCreateCategoryRequest } from '../../Validations/categories/CreateCategoryFormFactor';
import { toUpdateCategoryRequest,updateCategoryForm } from '../../Validations/categories/UpdateCategoryFormFactory';

@Component({
  selector: 'app-category-operation',
  imports: [ReactiveFormsModule],
  templateUrl: './category-operation.html',
  styleUrl: './category-operation.css',
})
export class CategoryOperation {

}
