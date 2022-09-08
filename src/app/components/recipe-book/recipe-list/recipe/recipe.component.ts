import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../../../../models//recipe.model';
import { RecipeBookService } from '../../recipe-book.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  @Input() recipe!: Recipe;
  constructor(
    private recipeListService: RecipeBookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  getRecipeItem(rc: Recipe) {
    this.router.navigate([rc.id], { relativeTo: this.activatedRoute });
  }
}
  