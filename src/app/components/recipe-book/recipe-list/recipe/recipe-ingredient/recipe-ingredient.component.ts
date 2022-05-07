import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { RecipeIngredient } from 'src/app/models/recipe-ingredient.model';
@Component({
  selector: 'app-recipe-ingredient',
  templateUrl: './recipe-ingredient.component.html',
  styleUrls: ['./recipe-ingredient.component.css'],
})
export class RecipeIngredientComponent implements OnInit {
  recipeItem!: RecipeIngredient;
  constructor() {}

  ngOnInit(): void {}

  getRecipeItem(rc: RecipeIngredient) {}
}
