import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeIngredient } from 'src/app/models/recipe-ingredient.model';
import { RecipeIngredientService } from '../recipe-book/recipe-list/recipe/recipe-ingredient/recipe-ingredient.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: any[] = [];
  igSub: Subscription;

  constructor(private recipeIngredientService: RecipeIngredientService) {
    this.igSub = this.recipeIngredientService.recipeItemsUpadte.subscribe(
      (newIngredientList) => {
        this.ingredients = newIngredientList;
        this.ingredients.forEach(igItem => {
          igItem.active = false;
        });
      }
    );
  }
  ngOnInit(): void {
    this.ingredients = this.recipeIngredientService.getRecipeItems();
    this.ingredients.forEach(igItem => {
      igItem.active = false;
    });
  }

  editItem(item: any, i: number) {
    this.ingredients.forEach(ig => {
      if (item.id === ig.id) {
        item.active = true;
        ig.active = true;
        ig.editMode = true;
      }
      else {
        ig.active = false;
        ig.editMode = false;
      }
    })
    debugger
    item.isEdit = true;
    item.isDeleted = 0;
    this.recipeIngredientService.recipeItemEditIndex.next({ item});
  }

  deleteItem(item: any, i: number) {
    console.log("delete item", item);
    if (item.editMode) {
      alert("Item taken for edit cannot be deleted. clear the item from edit first.");
      return;
    }
    item.editMode = true;
    item.isEdit = false;
    item.isDelete = 1;
    // this.recipeIngredientService.recipeItemEditIndex.next({item});
    this.ingredients.splice(i, 1);
  }

  ngOnDestroy(): void {
    this.igSub.unsubscribe();
    this.ingredients.forEach(igItem => {
      igItem.active = false;
      igItem.isDeleted = 0;
      igItem.editMode = false;
      igItem.isEdit = false;
    });
  }
}
