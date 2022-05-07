import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeIngredient } from 'src/app/models/recipe-ingredient.model';
import { RecipeBookService } from '../recipe-book.service';
import { RecipeIngredientService } from '../recipe-list/recipe/recipe-ingredient/recipe-ingredient.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe!: Recipe;
  constructor(
    private recipeListService: RecipeBookService,
    private recipeIngredientService: RecipeIngredientService
  ) {}

  ngOnInit(): void {
    console.warn(this.recipe);
  }

  addToShopList() {
    let neweIngr: RecipeIngredient[] = this.recipe.recipeItems;
    console.log(neweIngr);
    for (let ingrNew of this.recipe.recipeItems) {
      this.recipeIngredientService.addIngredient(ingrNew);
    }
  }
}
