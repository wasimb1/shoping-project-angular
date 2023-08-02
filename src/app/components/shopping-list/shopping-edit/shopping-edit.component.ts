import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeIngredientService } from '../../recipe-book/recipe-list/recipe/recipe-ingredient/recipe-ingredient.service';
import { RecipeIngredient } from 'src/app/models/recipe-ingredient.model';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import { ShoppingListService } from '../shopping-list.service';

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
  isListOpen: boolean = false;

  constructor(
    private recipeIngredientService: RecipeIngredientService,
    private shoppingListService: ShoppingListService,
    private fb: FormBuilder
  ) {
    this.shoppingListForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.pattern("[A-Za-z][A-Za-z0-9 ]*")]],
      quantity: [null, [Validators.required, Validators.pattern("^[1-9][0-9]*$")]],
      description: ['', Validators.required],
      recipeId: [''],
      recipeName: [''],
      addedViaRecipe: [0],
      active: [false],
      dto:[0],
      recipeIngredient: RecipeIngredient
    });
    this.clearFormJson = this.shoppingListForm.value;
  }

  ngOnInit(): void {
    // this.igSub = this.recipeIngredientService.recipeItemEditIndex.subscribe(
    //   (itemId: string) => {
    //     if (itemId) {
    //       let editItemExists = this.recipeIngredientService.getRecipeItem(itemId);
    //       console.log(editItemExists);
    //       if (editItemExists) {
    //         this.editItem = editItemExists;
    //         this.isEdit = true;
    //         this.shoppingListForm.patchValue({
    //           id: editItemExists.id,
    //           name: editItemExists.name,
    //           quantity: editItemExists.quantity,
    //           description: editItemExists.description
    //         });
    //         this.shoppingListForm.controls['name'].disable();
    //         this.shoppingListForm.controls['description'].disable();
    //       }
    //       else if (editItemExists.dto == 0) {
    //         this.isEdit = false;
    //         if (editItemExists) {
    //           this.recipeIngredientService.deleteIngredient(editItemExists.id);
    //           this.clearForm();
    //         }
    //       }
    //     }
    //   });

      this.igSub = this.shoppingListService.shoppingListItemToUpdateId.subscribe(
        (itemId: string) => {
          if (itemId) {
            let editItemExists = this.shoppingListService.getShoppingListItem(itemId);
            console.log(editItemExists);
            if (editItemExists) {
              this.editItem = editItemExists;
              this.isEdit = true;
              this.shoppingListForm.patchValue({
                id: editItemExists.id,
                name: editItemExists.name,
                quantity: editItemExists.quantity,
                description: editItemExists.recipeIngredient.description
              });
              this.shoppingListForm.controls['name'].disable();
              this.shoppingListForm.controls['description'].disable();
            }
          }
        });
  }

  addIngredient() {
    if (this.shoppingListForm.valid){
      if(!this.isEdit) {
        let addedIngredient: boolean = false;

        addedIngredient = this.shoppingListService.AddShoppingListItem(this.shoppingListForm.value);
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

  onIngredientSelect(event: any) {
    console.log("Shopping Item: ", event);
  }

  clearForm() {
    console.log(this.shoppingListForm);
    this.shoppingListForm.reset(this.clearFormJson);
    this.isEdit = false;
    this.shoppingListForm.controls['name'].enable();
    this.shoppingListForm.controls['description'].enable();
    if (this.editItem) {
      this.editItem.active = false;
      this.editItem.dto = 0;
    }

  }
}
