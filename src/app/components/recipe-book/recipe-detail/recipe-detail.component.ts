import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeIngredient } from 'src/app/models/recipe-ingredient.model';
import { RecipeBookService } from '../recipe-book.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RecipeIngredientService } from '../recipe-list/recipe/recipe-ingredient/recipe-ingredient.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  recipeId: string  = '1';
  constructor(
    private recipeListService: RecipeBookService,
    private recipeIngredientService: RecipeIngredientService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    let rc;
     this.route.params.subscribe(
      (params: Params) => {
        this.recipeId = params['id'];
          rc = this.recipeListService.getRecipe(this.recipeId);
        if (rc)
          this.recipe = rc[0];
        else {
          rc = this.recipeListService.getRecipe('1');
          this.recipe = rc[0];
        }
      }
    );
  }

  addToShopList() {
    let neweIngr: RecipeIngredient[] = this.recipe.recipeItems;
    console.log(neweIngr);
    for (let ingrNew of  this.recipe.recipeItems) {
      this.recipeIngredientService.addIngredient(ingrNew);
    }
  }

  editRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
