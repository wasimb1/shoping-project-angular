import { Injectable } from '@angular/core';
import { RecipeIngredientService } from '../recipe-book/recipe-list/recipe/recipe-ingredient/recipe-ingredient.service';
import { RecipeBookService } from '../recipe-book/recipe-book.service';
import { ShopingListItem } from 'src/app/models/shoppinList.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  shoppingListItems: ShopingListItem[] = [];
  constructor(
    private recipeIngredientService: RecipeIngredientService,
    private recipeBookService: RecipeBookService  ) {}

  shoppingListUpdated = new Subject<ShopingListItem[]>();
  shoppingListItemToUpdate = new Subject<{ item?: ShopingListItem, index: number }>();
  currentItemIndex = new Subject<number>();

  getAllShoppingListItems() {
    return this.shoppingListItems;
  }

  getShoppingListItem(id: string) {
    return this.shoppingListItems.find(shpItem => shpItem.id === id);
  }

  AddShoppingListItem(shoppingListItem: ShopingListItem): boolean {
    let shoppingListItemExist = this.shoppingListItems.find(shpItem => shpItem.recipeIngredientId === shoppingListItem.recipeIngredientId || shpItem.name.toLowerCase() === shoppingListItem.name.toLowerCase());
    if (!shoppingListItemExist) {
      const newShoppingListItem = new ShopingListItem(
        this.shoppingListItems.length.toString() + 1,
        shoppingListItem.name,
        shoppingListItem.quantity,
        shoppingListItem.description,
        shoppingListItem.recipeId,
        shoppingListItem.recipeName,
        shoppingListItem.addedViaRecipe,
        shoppingListItem.recipeIngredientId,
        shoppingListItem.recipeIngredientName,
        shoppingListItem.active,
        shoppingListItem.dto
      )
      this.shoppingListItems.push(newShoppingListItem);
      this.recipeIngredientService.updateIngredientQuantityById(shoppingListItem.recipeIngredientId, shoppingListItem.quantity, 2);
      this.shoppingListUpdated.next(this.shoppingListItems);
    }
    else
      alert("Ingredient Already Exists in Shopping List");
    return Boolean(!shoppingListItemExist);
  }

  updateShoppingListItem(shoppingListItem: ShopingListItem, mode: number): number {
    const index: number = this.shoppingListItems.findIndex(shpItem => shpItem.id == shoppingListItem.id);
    let updatedQty: number = 0;
    if (index > -1) {
      // this.shoppingListItems[index].id = shoppingListItem.id;
      // this.shoppingListItems[index].name = shoppingListItem.name;
      updatedQty =  Math.abs(+this.shoppingListItems[index].quantity - +shoppingListItem.quantity);
      this.shoppingListItems[index].quantity = shoppingListItem.quantity;
      // this.shoppingListItems[index].recipeId = shoppingListItem.recipeId;
      // this.shoppingListItems[index].recipeName = shoppingListItem.recipeName;
      // this.shoppingListItems[index].addedViaRecipe = shoppingListItem.addedViaRecipe;
      // this.shoppingListItems[index].recipeIngredient = shoppingListItem.recipeIngredient;
    }
    this.recipeIngredientService.updateIngredientQuantityById(shoppingListItem.recipeIngredientId, updatedQty, mode);
    this.shoppingListUpdated.next(this.shoppingListItems);
    return index;
  }

  deleteShoppingListItem(shoppingListItem: ShopingListItem) {
    const index: number = this.shoppingListItems.findIndex(shpItem => shpItem.id== shoppingListItem.id);
    if (index > -1) {
      this.shoppingListItems.splice(index, 1);
    }
    this.shoppingListUpdated.next(this.shoppingListItems);
    return index;
  }
}
