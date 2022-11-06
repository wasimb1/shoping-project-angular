import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe} from 'src/app/models/recipe.model';
import {RecipeBookService} from '../recipe-book.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes!: Recipe[];

  constructor(
    private recipeList: RecipeBookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeList.getRecipes();
  }

  addNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
