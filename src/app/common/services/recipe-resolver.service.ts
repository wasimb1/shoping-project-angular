import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot,Resolve} from "@angular/router";
import { DataStorageService } from "./data-storage.service";
import { Recipe } from "src/app/models/recipe.model";
import { RecipeBookService } from "src/app/components/recipe-book/recipe-book.service";


@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeBookService
    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    debugger
    if (recipes.length == 0)
      return this.dataStorageService.fetchRecipes();
    else return recipes;
  }
}
