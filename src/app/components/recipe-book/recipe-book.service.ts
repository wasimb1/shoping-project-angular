import { Injectable } from '@angular/core';
import { RecipeIngredient } from 'src/app/models/recipe-ingredient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeIngredientService } from './recipe-list/recipe/recipe-ingredient/recipe-ingredient.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeBookService {
  recipes: Recipe[] = [];
  recipesUpdated = new Subject<Recipe[]>();
  constructor(private RecipeIngredientService: RecipeIngredientService) {
    this.recipes = [
      new Recipe(
        '1',
        'Recipe 01',
        'This is first recipe.',
        'https://thumbs.dreamstime.com/z/home-cooking-logo-yellow-background-eps-home-cooking-logo-yellow-background-193149392.jpg',
        [
          ...this.RecipeIngredientService.getRecipeItems().filter(
            (ri) => ri.id === '01' || ri.id === '02'
          ),
        ]
      ),
      new Recipe(
        '2',
        'Recipe 02',
        'This is Second recipe.',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj2BvNtjmNPge_0hUtLsKvq1jR8ElNzkaAzw&usqp=CAU',
        [
          ...this.RecipeIngredientService.getRecipeItems().filter(
            (ri) => ri.id === '01' || ri.id === '03'
          ),
        ]
      ),
      new Recipe(
        '3',
        'Recipe 03',
        'This is third recipe.',
        'https://thumbs.dreamstime.com/z/home-cooking-logo-yellow-background-eps-home-cooking-logo-yellow-background-193149392.jpg',
        [
          ...this.RecipeIngredientService.getRecipeItems().filter(
            (ri) => ri.id === '03' || ri.id === '02'
          ),
        ]
      ),
      new Recipe(
        '4',
        'Recipe 04',
        'This is fourth recipe.',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj2BvNtjmNPge_0hUtLsKvq1jR8ElNzkaAzw&usqp=CAU',
        [
          new RecipeIngredient(
            '04',
            'Ingredient 04',
            'Recipe Ingredient fourth.',
            4 * 4,
            0
          ),
          new RecipeIngredient(
            '05',
            'Ingredient 05',
            'Recipe Ingredient Fifth.',
            5 * 5,
            0
          ),
        ]
      ),
    ];
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: string) {
    return this.recipes.find(recipe => recipe.id === id);
  }

  AddRecipe(recipe: Recipe) {
    recipe.id = (this.recipes.length + 1).toString();
    this.recipes.push(recipe);
    this.recipesUpdated.next(this.recipes);
  }

  updateRecipe(recipe: Recipe): number {
    const index: number = this.recipes.findIndex(rec => rec.id== recipe.id);
    if (index > -1) {
      this.recipes[index] = recipe;
      this.recipesUpdated.next(this.recipes);
    }
    return index;
  }
}
