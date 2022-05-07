import { Injectable, EventEmitter } from '@angular/core';
import { RecipeIngredient } from 'src/app/models/recipe-ingredient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeIngredientService } from './recipe-list/recipe/recipe-ingredient/recipe-ingredient.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeBookService {
  selectedRecipe = new EventEmitter<Recipe>();
  recipes: Recipe[] = [];

  constructor(private RecipeIngredientService: RecipeIngredientService) {}

  getRecipes() {
    this.recipes = [
      new Recipe(
        '01',
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
        '02',
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
        '03',
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
        '04',
        'Recipe 04',
        'This is fourth recipe.',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj2BvNtjmNPge_0hUtLsKvq1jR8ElNzkaAzw&usqp=CAU',
        [
          new RecipeIngredient(
            '04',
            'Ingredient 04',
            'Recipe Ingredient fourth.',
            27
          ),
          new RecipeIngredient(
            '05',
            'Ingredient 04',
            'Recipe Ingredient fourth.',
            27
          ),
        ]
      ),
    ];
    return this.recipes;
  }
}
