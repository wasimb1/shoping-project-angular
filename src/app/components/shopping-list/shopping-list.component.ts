import { Component, OnInit } from '@angular/core';
import { RecipeIngredient } from 'src/app/models/recipe-ingredient.model';
import { RecipeIngredientService } from '../recipe-book/recipe-list/recipe/recipe-ingredient/recipe-ingredient.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: RecipeIngredient[] = [];
  constructor(private recipeIngredientService: RecipeIngredientService) {
    this.recipeIngredientService.recipeItemAdded.subscribe(
      (newIngredientList) => (this.ingredients = newIngredientList)
    );
  }

  ngOnInit(): void {
    this.ingredients = this.recipeIngredientService.getRecipeItems();
  }
}
