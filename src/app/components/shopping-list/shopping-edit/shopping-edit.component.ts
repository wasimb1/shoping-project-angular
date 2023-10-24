import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeIngredientService } from '../../recipe-book/recipe-list/recipe/recipe-ingredient/recipe-ingredient.service';
import { RecipeIngredient } from 'src/app/models/recipe-ingredient.model';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import { ShoppingListService } from '../shopping-list.service';
import { ShopingListItem } from 'src/app/models/shoppinList.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {

  shoppingListForm: FormGroup;
  clearFormJson: any;
  igSub: Subscription;
  isEdit: boolean = false;
  editItem: ShopingListItem = null;
  selectedIndex: number = -1;
  clearIngInput: boolean = false;

  constructor(
    private recipeIngredientService: RecipeIngredientService,
    private shoppingListService: ShoppingListService,
    private fb: FormBuilder
  ) {
    this.shoppingListForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.pattern("[A-Za-z][A-Za-z0-9 ]*")]],
      quantity: [null, [Validators.required, Validators.min(0), this.quantityValidator.bind(this)]],
      description: ['', Validators.required],
      recipeId: [''],
      recipeName: [''],
      addedViaRecipe: [0],
      recipeIngredientId: [''],
      recipeIngredientName: [''],
      active: [false],
      dto:[0]
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

      this.igSub = this.shoppingListService.shoppingListItemToUpdate.subscribe(
        ({ item, index }) => {
          if (item) {
            // let editItemExists = this.shoppingListService.getShoppingListItem(item.id);
            // console.log(editItemExists);
            // if (editItemExists) {
              this.editItem = item;
              this.isEdit = true;
              this.shoppingListForm.patchValue({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                description: item.description,
                recipeIngredientId: item.recipeIngredientId,
                recipeIngredientName: item.recipeIngredientName
              });
              this.shoppingListForm.controls['name'].disable();
              this.shoppingListForm.controls['description'].disable();
            // }
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
        let mode = updateItem.quantity > this.editItem.quantity ? 2 : updateItem.quantity < this.editItem.quantity ? 1 : -1;
        // this.recipeIngredientService.updateIngredient(updateItem);
        if(mode !== -1)
          this.shoppingListService.updateShoppingListItem(updateItem, mode);
        this.clearForm();
      }
    } else {
      this.shoppingListForm.markAllAsTouched();
    }
  }

  onIngredientSelect(ingredient: RecipeIngredient) {
    console.log("Selected Ingredient: ", ingredient);
    this.shoppingListForm.patchValue({
      // id: ingredient.id,
      name: ingredient.name,
      description: ingredient.description,
      quantity: ingredient.quantity,
      recipeIngredientId: ingredient.id,
      recipeIngredientName: ingredient.name
    });
    this.editItem =  this.shoppingListForm.value;
    this.clearIngInput = false;
    console.log("Selected Ingredient: ", this.shoppingListForm.value);
  }

  quantityValidator(control: AbstractControl): ValidationErrors | null {
    const quantityValue = control.value;

    //in update mode, when we try to update the quantity greater the the edited item quantity
    if (this.editItem && +quantityValue > this.editItem.quantity) {
      return { 'quantityGreater': true };
    }
    else if (quantityValue && quantityValue > 0) {
      return null;
    }
    else {
      return { 'quantityInvalid': true };
    }

    // // Check for the required condition
    // if (quantityValue === null || quantityValue === '') {
    //   return { required: true };
    // }

    // // Check for the pattern condition
    // if (!/^[0-9]+$/.test(quantityValue) || quantityValue <= 0) {
    //   return { pattern: true };
    // }

    // if (this.editItem && +quantityValue > this.editItem.quantity) {
    //   // return an error object with a custom key

    // }
    // // return null if the value is valid
    // return null;
  }


  clearForm() {
    console.log(this.shoppingListForm);
    this.shoppingListForm.reset(this.clearFormJson);
    this.isEdit = false;
    this.shoppingListForm.controls['name'].enable();
    this.shoppingListForm.controls['description'].enable();
    this.clearIngInput = true;
    if (this.editItem) {
      this.editItem.active = false;
      this.editItem.dto = 0;
      const itmUpdate: {item: ShopingListItem, index: number} = {item: null , index:-1}
      this.shoppingListService.shoppingListItemToUpdate.next(itmUpdate);
    }
    this.editItem = null;
  }
}
