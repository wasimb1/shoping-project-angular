import { RecipeIngredient } from '../../../../../models/recipe-ingredient.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import {stringify} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root',
})
export class RecipeIngredientService {
  recipeItems: RecipeIngredient[] = [];
  recipeItemsUpadte = new Subject<RecipeIngredient[]>();
  // recipeItemEditIndex = new Subject<{id:string, isEdit: boolean, isDelete: boolean}>();
  recipeItemEditIndex = new Subject<{item:any}>();
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

  addIngredient(newIngredient: RecipeIngredient):boolean {
    this.itemAlreadyExists = false;
    for (let i = 0; i < this.recipeItems.length; i++){
      if (this.recipeItems[i].id === newIngredient.id || this.recipeItems[i].name === newIngredient.name) {
        this.itemAlreadyExists = true;
        alert("Ingredient already exists");
        break;
      }
    }
    if (!this.itemAlreadyExists) {
      this.recipeItems.push(newIngredient);
    }
    this.recipeItemsUpadte.next(this.recipeItems.slice());
    return !this.itemAlreadyExists;
  }

  updateIngredient(editItem: RecipeIngredient){
    let editItemExists = this.getRecipeItem(editItem.id);
    if(editItemExists !== undefined && editItemExists !== null){
      editItemExists.name = editItem.name;
      editItemExists.amount = editItem.amount;
      editItemExists.description = editItem.description;
      let index = this.recipeItems.map(item => item.id).indexOf(editItemExists.id);
      this.recipeItems.splice(index, 1, editItemExists);
    }
  }

  deleteIngredient(id: string){
    let editItemExists = this.getRecipeItem(id);
    if(editItemExists !== undefined && editItemExists !== null){
      let index = this.recipeItems.map(item => item.id).indexOf(editItemExists.id);
      this.recipeItems.splice(index, 1);
      this.recipeItemsUpadte.next(this.recipeItems.slice());
    }
  }

}


