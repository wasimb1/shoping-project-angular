import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeIngredientService } from '../../recipe-book/recipe-list/recipe/recipe-ingredient/recipe-ingredient.service';
import { RecipeIngredient } from 'src/app/models/recipe-ingredient.model';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {

  shoppingListForm: FormGroup;
  clearFormJson;
  igSub: Subscription;
  isEdit: boolean = false;
  editItem: any;

  constructor(
    private recipeIngredientService: RecipeIngredientService,
    private fb: FormBuilder
  ) {
    this.shoppingListForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      amount: [null, Validators.required],
      description: ['', Validators.required]
    });
    this.clearFormJson = this.shoppingListForm.value;
  }

  ngOnInit(): void {
    this.igSub = this.recipeIngredientService.recipeItemEditIndex.subscribe(
      (obj: {item:any})=> {
        if (obj.item.id !== null && obj.item.id !== undefined) {
          this.isEdit = true;
          // let editItemExists = this.recipeIngredientService.getRecipeItem(obj.id);
          console.log(obj);
          this.editItem = obj.item;
          if(obj.item.isEdit){
            if (obj !== null && obj.item.id !== undefined) {
              this.shoppingListForm.patchValue({
                id: obj.item.id,
                name: obj.item.name,
                amount: obj.item.amount,
                description: obj.item.description
              });
              this.shoppingListForm.controls['name'].disable();
            }
          }
          else if (obj.item.isDelete){
            if (obj !== null && obj.item.id !== undefined) {
              this.recipeIngredientService.deleteIngredient(obj.item.id);
              this.clearForm();
            }
          }
        }
      })
  }

  addIngredient() {
    if (this.shoppingListForm.valid){
      if(!this.isEdit) {
        let addedIngredient: boolean = false;
        let newRecipeIngredient: RecipeIngredient = new RecipeIngredient(
          (this.recipeIngredientService.getRecipeItems().length + 1).toString(),
          this.shoppingListForm.controls['name'].value,
          this.shoppingListForm.controls['description'].value,
          this.shoppingListForm.controls['amount'].value,
        );
        addedIngredient = this.recipeIngredientService.addIngredient(newRecipeIngredient);
        if (addedIngredient)
          this.clearForm();
      }
      else{
        let updateItem = this.shoppingListForm.getRawValue();
        this.recipeIngredientService.updateIngredient(updateItem);
        this.clearForm();
      }
    } else {
      this.shoppingListForm.markAllAsTouched();
    }
  }

  clearForm() {
    console.log(this.shoppingListForm);
    this.shoppingListForm.reset(this.clearFormJson);
    this.isEdit = false;
    this.shoppingListForm.controls['name'].enable();
    if (this.editItem !== undefined && this.editItem !== null) {
      this.editItem.active = false;
      this.editItem.isEdit = false;
      this.editItem.isDelete = false;
    }
    
  }
}
