import { Injectable } from '@angular/core';
import { RecipeIngredient } from 'src/app/models/recipe-ingredient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeIngredientService } from './recipe-list/recipe/recipe-ingredient/recipe-ingredient.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeBookService {
  private recipes: Recipe[] = [];
  recipesUpdated = new Subject<Recipe[]>();
  constructor(private RecipeIngredientService: RecipeIngredientService) {
    // this.recipes = [
    //   new Recipe(
    //     '1',
    //     'Recipe 01',
    //     'This is first recipe.',
    //     'https://thumbs.dreamstime.com/z/home-cooking-logo-yellow-background-eps-home-cooking-logo-yellow-background-193149392.jpg',
    //     [
    //       ...this.RecipeIngredientService.getRecipeItems().filter(
    //         (ri) => ri.id === '1' || ri.id === '2'
    //       )
    //     ]
    //   ),
    //   new Recipe(
    //     '2',
    //     'Recipe 02',
    //     'This is Second recipe.',
    //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj2BvNtjmNPge_0hUtLsKvq1jR8ElNzkaAzw&usqp=CAU',
    //     [
    //       ...this.RecipeIngredientService.getRecipeItems().filter(
    //         (ri) => ri.id === '1' || ri.id === '3'
    //       )
    //     ]
    //   ),
    //   new Recipe(
    //     '3',
    //     'Recipe 03',
    //     'This is third recipe.',
    //     'https://thumbs.dreamstime.com/z/home-cooking-logo-yellow-background-eps-home-cooking-logo-yellow-background-193149392.jpg',
    //     [
    //       ...this.RecipeIngredientService.getRecipeItems().filter(
    //         (ri) => ri.id === '3' || ri.id === '2'
    //       )
    //     ]
    //   ),
    //   new Recipe(
    //     '4',
    //     'Recipe 04',
    //     'This is fourth recipe.',
    //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj2BvNtjmNPge_0hUtLsKvq1jR8ElNzkaAzw&usqp=CAU',
    //     [
    //       ...this.RecipeIngredientService.getRecipeItems().filter(
    //         (ri) => ri.id === '4' || ri.id === '5'
    //       )
    //     ]
    //   ),
    // ];
  }

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesUpdated.next(this.recipes.slice());
  }

  getRecipe(id: string) {
    return this.recipes.find(recipe => recipe.id === id);
  }

  AddRecipe(recipe: Recipe): boolean {
    let recipeItemExist = this.recipes.find(rc => rc.id === recipe.id || rc.name.toLowerCase() === recipe.name.toLowerCase());
    if (!recipeItemExist) {
      recipe.id = (this.recipes.length + 1).toString();
      this.recipes.push(recipe);
      recipe.recipeItems.forEach(item => {
        this.RecipeIngredientService.addIngredient(item);
      });
      this.recipesUpdated.next(this.recipes);
      return true;
    }
    else {
      alert("Recipe already Exists");
      return false;
    }
  }

  updateRecipe(recipe: Recipe): number {
    const index: number = this.recipes.findIndex(rec => rec.id== recipe.id);
    if (index > -1) {
      this.recipes[index].id = recipe.id;
      this.recipes[index].name = recipe.name;
      this.recipes[index].description = recipe.description;
      this.recipes[index].imagePath = recipe.imagePath;
      this.recipes[index].recipeItems.forEach((rcItem,i) => {
        if (rcItem.id == recipe.recipeItems[i].id) {
          rcItem.quantity = recipe.recipeItems[i].quantity;
        }
      });
      recipe.recipeItems.forEach(item => {
        this.RecipeIngredientService.updateIngredient(item);
      });
      this.recipesUpdated.next(this.recipes);
    }
    return index;
  }

  deleteRecipe(recipe: Recipe) {
    const index: number = this.recipes.findIndex(rec => rec.id == recipe.id);
    if (index >= 0) {
      this.recipes.splice(index, 1);
      recipe.recipeItems.forEach(item => {
        let recipeItemExistsInOtherRecipes = this.recipes.find(rc => rc.id != recipe.id && rc.recipeItems.find(rcIng => rcIng.id == item.id));
        if(!recipeItemExistsInOtherRecipes)
          this.RecipeIngredientService.deleteIngredient(item.id);
      });
    }
    this.recipesUpdated.next(this.recipes);
  }
}
