import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeBookService } from './recipe-book.service';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
})
export class RecipeBookComponent implements OnInit, OnChanges {
  @Input() selectedPage: string = 'recipe-list';
  selectedRecipe!: Recipe;
  constructor(private recipeBookService: RecipeBookService) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log("selectedPage", this.selectedPage);
  }

  ngOnInit(): void {
    this.recipeBookService.selectedRecipe.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
  }
}
