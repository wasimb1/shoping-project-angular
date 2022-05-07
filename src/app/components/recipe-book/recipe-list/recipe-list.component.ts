import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeBookService } from '../recipe-book.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes!: Recipe[];
  constructor(private recipeList: RecipeBookService) {}

  ngOnInit(): void {
    this.recipes = this.recipeList.getRecipes();
  }

  // getRecipe(rc: Recipe) {
  //   this.recipeList.selectedRecipe.emit(rc);
  // }
}
