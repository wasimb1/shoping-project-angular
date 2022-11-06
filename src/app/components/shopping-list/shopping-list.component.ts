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

  editItem(item: any) {
    this.ingredients.forEach(ig => {
      if (item.id === ig.id)
        item.active = true;
      else
        ig.active = false;
    })
    debugger
    item.isEdit = true;
    item.isDelete = false;
    this.recipeIngredientService.recipeItemEditIndex.next({ item});
  }

  deleteItem(item: any) {
    item.isEdit = false;
    item.isDelete = true;
    this.recipeIngredientService.recipeItemEditIndex.next({item});
  }

  ngOnDestroy(): void {
    this.igSub.unsubscribe();
    this.ingredients.forEach(igItem => {
      igItem.active = false;
    });
  }
}
