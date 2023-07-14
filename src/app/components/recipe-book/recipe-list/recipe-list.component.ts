import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe} from 'src/app/models/recipe.model';
import {RecipeBookService} from '../recipe-book.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes!: Recipe[];
  sub: Subscription;

  constructor(
    private recipeList: RecipeBookService,
    private route: ActivatedRoute,
    private router: Router,
    private recipeBookService: RecipeBookService
  ) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeList.getRecipes();
    this.sub = this.recipeBookService.recipesUpdated.subscribe(updatedRecipeList => {
      this.recipes = updatedRecipeList;
    })
  }

  addNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
