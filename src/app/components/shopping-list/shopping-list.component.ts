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
  ingredients: RecipeIngredient[] = [];
  igSub: Subscription;

  constructor(private recipeIngredientService: RecipeIngredientService) {
    this.igSub = this.recipeIngredientService.recipeItemAdded.subscribe(
     (newIngredientList) => (this.ingredients = newIngredientList)
    );
  }
  ngOnInit(): void {
    this.ingredients = this.recipeIngredientService.getRecipeItems();
  }
  ngOnDestroy(): void {
    this.igSub.unsubscribe();
  }
}
