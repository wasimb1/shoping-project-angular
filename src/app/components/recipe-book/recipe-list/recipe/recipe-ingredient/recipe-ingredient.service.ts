import { RecipeIngredient } from '../../../../../models/recipe-ingredient.model';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipeIngredientService {
  recipeItems: RecipeIngredient[] = [];
  recipeItemAdded = new EventEmitter<RecipeIngredient[]>();

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
    return this.recipeItems.slice(0);
  }

  addIngredient(newIngredient: RecipeIngredient) {
    console.log(newIngredient);
    this.recipeItems.push(newIngredient);
    this.recipeItemAdded.emit(this.recipeItems.slice());
  }
}
