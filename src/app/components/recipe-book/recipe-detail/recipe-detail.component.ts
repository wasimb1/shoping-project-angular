import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeIngredient } from 'src/app/models/recipe-ingredient.model';
import { RecipeBookService } from '../recipe-book.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RecipeIngredientService } from '../recipe-list/recipe/recipe-ingredient/recipe-ingredient.service';
import { ShopingListItem } from 'src/app/models/shoppinList.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  recipeId: string  = '1';
  constructor(
    private recipeBookService: RecipeBookService,
    private recipeIngredientService: RecipeIngredientService,
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    let rc;
     this.route.params.subscribe(
      (params: Params) => {
        this.recipeId = params['id'];
          rc = this.recipeBookService.getRecipe(this.recipeId);
        if (rc)
          this.recipe = rc;
        else {
          rc = this.recipeBookService.getRecipe('1');
          this.recipe = rc;
        }
      }
    );
  }

  addToShopList() {
    let neweIngr: RecipeIngredient[] = this.recipe.recipeItems;
    let added: boolean = false;
    this.recipe.recipeItems.forEach(rcItem => {
      const newShopLstItem: ShopingListItem = new ShopingListItem(
        this.recipe.id + rcItem.id,
        rcItem.name,
        rcItem.quantity,
        this.recipe.id, this.recipe.name,
        1, rcItem, false, 0
      );
      console.log("newShopLstItem: ", newShopLstItem);
      added = this.shoppingListService.AddShoppingListItem(newShopLstItem);

    });
    if (added)
    alert("Ingredients Added to shoppingList");
    else
      alert("Error Adding Ingredients to shoppingList");
    // console.log(neweIngr);
    // for (let ingrNew of  this.recipe.recipeItems) {
    //   this.recipeIngredientService.addIngredient(ingrNew);
    // }
  }

  editRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  deleteRecipe() {
    this.recipeBookService.deleteRecipe(this.recipe);
  }
}
