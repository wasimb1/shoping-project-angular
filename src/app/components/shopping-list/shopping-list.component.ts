import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeIngredient } from 'src/app/models/recipe-ingredient.model';
import { RecipeIngredientService } from '../recipe-book/recipe-list/recipe/recipe-ingredient/recipe-ingredient.service';
import { ShopingListItem } from 'src/app/models/shoppinList.model';
import { ShoppingListService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: any[] = [];
  igSub: Subscription;
  shoppingList: ShopingListItem[] = [];
  currentIndex: number = -1;

  constructor(
    private recipeIngredientService: RecipeIngredientService,
    private shoppingListService: ShoppingListService
  ) {
    // this.igSub = this.recipeIngredientService.recipeItemsUpadte.subscribe(
    //   (newIngredientList) => {
    //     this.ingredients = newIngredientList;
    //     this.ingredients.forEach(igItem => {
    //       igItem.active = false;
    //     });
    //   }
    // );
    this.igSub = this.shoppingListService.shoppingListUpdated.subscribe(
      (newIngredientList) => {
        this.shoppingList = newIngredientList;
        this.shoppingList.forEach(igItem => {
          igItem.active = false;
        });
      }
    );
  }
  ngOnInit(): void {
    // this.ingredients = this.recipeIngredientService.getRecipeItems();
    this.shoppingList = this.shoppingListService.getAllShoppingListItems();
    // this.ingredients.forEach(igItem => {
    //   igItem.active = false;
    // });
    this.shoppingList.forEach(igItem => {
      igItem.active = false;
    });

    this.igSub = this.shoppingListService.shoppingListItemToUpdate.subscribe(
      ({ item, index }) => {
        this.currentIndex = index;
      });
  }

  editItem(item: ShopingListItem, i: number) {
    // this.ingredients.forEach(ig => {
    //   if (item.id === ig.id) {
    //     item.active = true;
    //     ig.active = true;
    //   }
    //   else {
    //     ig.active = false;
    //   }
    // });
    // this.recipeIngredientService.recipeItemEditIndex.next(item.id);
    // this.shoppingList.forEach(ig => {
    //   if (item.id === ig.id) {
    //     item.active = true;
    //     ig.active = true;
    //   }
    //   else {
    //     ig.active = false;
    //   }
    // });
    this.currentIndex = i;
    item.dto = 0;
    const itmUpdate: {item: ShopingListItem, index: number} = {item , index:i}
    this.shoppingListService.shoppingListItemToUpdate.next(itmUpdate);
  }

  deleteItem(item: ShopingListItem, i: number) {
    console.log("delete item", item);
    if (item.active) {
      alert("Item taken for edit cannot be deleted. clear the item from edit first.");
      return;
    }
    item.dto = 1;

    // this.recipeIngredientService.recipeItemEditIndex.next({item});
    this.ingredients.splice(i, 1);

    this.shoppingListService.deleteShoppingListItem(item);
  }

  ngOnDestroy(): void {
    this.igSub.unsubscribe();
    // this.ingredients.forEach(igItem => {
    //   igItem.active = false;
    //   igItem.dto = 0;
    // });
    this.currentIndex = -1;
    this.shoppingList.forEach(igItem => {
      igItem.active = false;
      igItem.dto = 0;
    });
  }
}
