import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeIngredientService } from '../../recipe-book/recipe-list/recipe/recipe-ingredient/recipe-ingredient.service';
import { RecipeIngredient } from 'src/app/models/recipe-ingredient.model';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {

  shoppingListForm: FormGroup;
  clearFormJson;
  igSub: Subscription;
  isEdit: boolean = false;
  editItem: any = null;

  constructor(
    private recipeIngredientService: RecipeIngredientService,
    private fb: FormBuilder
  ) {
    this.shoppingListForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.pattern("[A-Za-z][A-Za-z0-9 ]*")]],
      amount: [null, [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],
      description: ['', Validators.required]
    });
    this.clearFormJson = this.shoppingListForm.value;
  }

  ngOnInit(): void {
    this.igSub = this.recipeIngredientService.recipeItemEditIndex.subscribe(
      (itemId: string) => {
        debugger
        if (itemId) {
          let editItemExists = this.recipeIngredientService.getRecipeItem(itemId);
          console.log(editItemExists);
          if (editItemExists) {
            this.editItem =editItemExists;
            this.isEdit = true;
            this.shoppingListForm.patchValue({
              id: editItemExists.id,
              name: editItemExists.name,
              amount: editItemExists.amount,
              description: editItemExists.description
            });
            this.shoppingListForm.controls['name'].disable();
          }
          else if (editItemExists.dto == 0) {
            this.isEdit = false;
            if (editItemExists) {
              this.recipeIngredientService.deleteIngredient(editItemExists.id);
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
          0
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
      this.editItem.dto = 0;
    }

  }
}
