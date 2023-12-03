import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeBookService } from 'src/app/components/recipe-book/recipe-book.service';
import { Recipe } from 'src/app/models/recipe.model';
import { map,tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private httpClient: HttpClient, private ricepeService: RecipeBookService) { }

  storeRecipes() {
    let recipes: Recipe[] = this.ricepeService.getRecipes();
    this.httpClient.put('https://shopping-project-6167c-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json', recipes)
      .subscribe({
        next: (res) => {
          console.log("Recipes stored successfully: ", res);
        },
        error: (err) => {
          console.log("Error storing recipes: ", err);
        },
        complete: () => {
          console.log("Recipes stored API Complete");
        }
      });
  }


  fetchRecipes() {
    return this.httpClient.get<Recipe[]>('https://shopping-project-6167c-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              recipeItems: recipe?.recipeItems.length > 0 ? recipe.recipeItems : []
            }
          })
        }),
        tap(recipes => {
          console.log("Recipes on store: ", recipes);
          this.ricepeService.setRecipes(recipes);
        })
      )
      // .subscribe({
      //   next: (res) => {
      //     console.log("Recipes on store: ", res);
      //     this.ricepeService.setRecipes(res);
      //   },
      //   error: (err) => {
      //     console.log("Error getting recipes: ", err);
      //   },
      //   complete: () => {
      //     console.log("Recipes Fetching API Complete");
      //   }
      // });
  }
}
