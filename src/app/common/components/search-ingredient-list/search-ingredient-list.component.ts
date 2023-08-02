import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { RecipeIngredient } from 'src/app/models/recipe-ingredient.model';
import { RecipeIngredientService } from 'src/app/components/recipe-book/recipe-list/recipe/recipe-ingredient/recipe-ingredient.service';
import { CommonService } from '../../services/common-service.service';
import { Subscription, take, takeLast } from 'rxjs';
@Component({
  selector: 'app-search-ingredient-list',
  templateUrl: './search-ingredient-list.component.html',
  styleUrls: ['./search-ingredient-list.component.scss']
})
export class SearchIngredientListComponent implements OnInit, OnDestroy {
  ingredients: RecipeIngredient[] = [];
  @Output() selectedIngredient: EventEmitter<RecipeIngredient> = new EventEmitter();
  isListOpen: boolean = false;
  sub: Subscription;

  constructor(
    private recipeIngredientService: RecipeIngredientService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.sub = this.commonService.isListOpen.subscribe(value => {
      this.isListOpen = value;
      if (!this.isListOpen) {
        this.ingredients = [];
      }
      console.log("ingredients: ", this.ingredients);
    });
  }

  fetchIngredients(ingName: HTMLInputElement) {
    console.log("Ing Name: ", ingName.value);
    this.ingredients = this.recipeIngredientService.getRecipeItembyName(ingName.value);
     this.isListOpen = this.ingredients.length > 0 ? true: false;
    console.log("List view Items: ", this.ingredients);
  }

  selctIngredient(ingredient: any) {
    this.selectedIngredient.emit(ingredient);
    this.isListOpen = false;
    this.ingredients = [];
  }

  closeItemList(KeyboardEvent: any) {
    console.log(KeyboardEvent)
    this.isListOpen = false;
    this.ingredients = [];
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
