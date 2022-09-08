import { RecipeIngredient } from '../../../../../models/recipe-ingredient.model';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipeIngredientService {
  recipeItems: RecipeIngredient[] = [];
  recipeItemAdded = new EventEmitter<RecipeIngredient[]>();
  itemAlreadyExists: boolean = false;

  constructor() {
    this.recipeItems = [
      new RecipeIngredient(
        '01',
        'RecipeItem 01',
        'RecipeItem description first',
        1*1
      ),
      new RecipeIngredient(
        '02',
        'RecipeItem 02',
        'RecipeItem description second',
        2*2
      ),
      new RecipeIngredient(
        '03',
        'RecipeItem 03',
        'RecipeItem description thrid',
        3*3
      ),
    ];
  }

  getRecipeItem(id: string) {
    return this.recipeItems.find((recipeItem) => recipeItem.id === id);
  }

  getRecipeItems() {
    return this.recipeItems.slice();
  }

  addIngredient(newIngredient: RecipeIngredient) {
    this.itemAlreadyExists = false;
    debugger
    console.log(newIngredient);
    for (let i = 0; i < this.recipeItems.length; i++){
      if (this.recipeItems[i].id === newIngredient.id) {
        this.itemAlreadyExists = true;
        break;
      }
    }
    if (!this.itemAlreadyExists) {
      this.recipeItems.push(newIngredient);
    }
    this.recipeItemAdded.emit(this.recipeItems.slice());
  }
}
