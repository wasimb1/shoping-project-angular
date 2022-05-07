import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../../../models//recipe.model';
import { RecipeBookService } from '../../recipe-book.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  @Input() recipe!: Recipe;
  // defaultRecipe!: Recipe;
  @Output() selectedRecipe = new EventEmitter<Recipe>();
  constructor(private recipeListService: RecipeBookService) {}

  ngOnInit(): void {
    // if (this.recipe.id == '01') {
    //   this.defaultRecipe = this.recipe;
    //   this.recipeListService.selectedRecipe.emit(this.defaultRecipe);
    // }
  }

  getRecipeItem(rc: Recipe) {
    this.recipeListService.selectedRecipe.emit(rc);
  }
}
