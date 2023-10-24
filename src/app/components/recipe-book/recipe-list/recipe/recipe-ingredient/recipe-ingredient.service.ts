import { RecipeIngredient } from '../../../../../models/recipe-ingredient.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeIngredientService {
  recipeIngredients: RecipeIngredient[] = [];
  recipeItemsUpadte = new Subject<RecipeIngredient[]>();
  recipeItemEditIndex = new Subject<string>();
  itemAlreadyExists: boolean = false;

  constructor() {
    this.recipeIngredients = [
      new RecipeIngredient(
        '1',
        'RecipeItem 01',
        'RecipeItem description first',
        1 * 1, 50, 0
      ),
      new RecipeIngredient(
        '2',
        'RecipeItem 02',
        'RecipeItem description second',
        2 * 2, 40, 0
      ),
      new RecipeIngredient(
        '3',
        'RecipeItem 03',
        'RecipeItem description thrid',
        3 * 3, 60, 0
      ),
      new RecipeIngredient(
        '4',
        'Ingredient 04',
        'Recipe Ingredient fourth.',
        4 * 4, 30, 0
      ),
      new RecipeIngredient(
        '5',
        'Ingredient 05',
        'Recipe Ingredient Fifth.',
        5 * 5, 70, 0
      )
    ];
  }

  getRecipeItem(id: string) {
    return this.recipeIngredients.find((recipeItem) => recipeItem.id === id);
  }

  getRecipeItembyName(name: string):RecipeIngredient[] {
    return this.recipeIngredients.filter((recipeItem) => recipeItem.name.toLowerCase().includes(name.toLowerCase()));
  }


  getRecipeItems() {
    return this.recipeIngredients;
  }

  addIngredient(newIngredient: RecipeIngredient): boolean {
    let newRecipeIngredient: RecipeIngredient = new RecipeIngredient(
      (this.getRecipeItems().length + 1).toString(),
      newIngredient.name,
      newIngredient.description,
      newIngredient.amount,
      newIngredient.quantity,
      0
    );
    this.itemAlreadyExists = false;
    this.recipeIngredients.forEach(recipeIngredient => {
      if (recipeIngredient.id === newIngredient.id || recipeIngredient.name == newIngredient.name) {
        this.itemAlreadyExists = true;
        recipeIngredient.quantity++;
      }
    });
    if (!this.itemAlreadyExists) {
      this.recipeIngredients.push(newRecipeIngredient);
    }
    this.recipeItemsUpadte.next(this.recipeIngredients);
    return !this.itemAlreadyExists;
  }

  updateIngredient(editItem: RecipeIngredient){
    let editItemExists = this.getRecipeItem(editItem.id);
    if(editItemExists){
      editItemExists.name = editItem.name;
      editItemExists.quantity = editItem.quantity;
      editItemExists.description = editItem.description;
      let index = this.recipeIngredients.map(item => item.id).indexOf(editItemExists.id);
      this.recipeIngredients.splice(index, 1, editItemExists);
    }
  }
  updateIngredientQuantityById(id: string, consumedQty: number, mode:number){
    let editItemExists = this.getRecipeItem(id);
    if(editItemExists){
      let index = this.recipeIngredients.findIndex(item => item.id === id);
      if (index !== -1) {
        if (mode === 1)
        this.recipeIngredients[index].quantity = this.recipeIngredients[index].quantity + consumedQty;
        else if (mode === 2)
        this.recipeIngredients[index].quantity = this.recipeIngredients[index].quantity - consumedQty;
      }
    }
  }

  deleteIngredient(id: string){
    let editItemExists = this.getRecipeItem(id);
    if(editItemExists){
      let index = this.recipeIngredients.map(item => item.id).indexOf(editItemExists.id);
      this.recipeIngredients.splice(index, 1);
      this.recipeItemsUpadte.next(this.recipeIngredients);
    }
  }
}


