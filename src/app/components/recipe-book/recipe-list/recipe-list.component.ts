import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe} from 'src/app/models/recipe.model';
import {RecipeBookService} from '../recipe-book.service';
import { Subscription } from 'rxjs';
import { ConfirmationModalService } from 'src/app/common/components/modals/confirmation-modal/confirmation-modal.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes!: Recipe[];
  sub: Subscription;

  constructor(
    private recipeList: RecipeBookService,
    private route: ActivatedRoute,
    private router: Router,
    private recipeBookService: RecipeBookService,
    private confirmationModalService: ConfirmationModalService
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

  openModal() {
    this.sub = this.confirmationModalService.openConfirmationModal(`Do you really want to delete the item ${'itemname'} ?`).subscribe(res => {
      console.log("Modal Result: ", res);
      if (res)
        console.log("Proceed for the action");
      else
        console.log("Operation was cancelled");
    });
  }

  ngOnDestroy(): void {
    if (this.sub)
      this.sub.unsubscribe();
  }
}
