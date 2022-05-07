import { RecipeIngredient } from '../../../../../models/recipe-ingredient.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipeIngredientService {
  recipeItems: RecipeIngredient[] = [];

  constructor() {
    this.recipeItems = [
      new RecipeIngredient(
        '01',
        'RecipeItem 01',
        'RecipeItem description first',
        3
      ),
      new RecipeIngredient(
        '02',
        'RecipeItem 02',
        'RecipeItem description second',
        4
      ),
      new RecipeIngredient(
        '03',
        'RecipeItem 03',
        'RecipeItem description thrid',
        8
      ),
    ];
  }

  getRecipeItem(id: string) {
    return this.recipeItems.find((recipeItem) => recipeItem.id === id);
  }

  getRecipeItems() {
    return this.recipeItems;
  }

  addIngredient(newIngredient: RecipeIngredient) {
    console.log(newIngredient);
    this.recipeItems.push(newIngredient);
  }
}
