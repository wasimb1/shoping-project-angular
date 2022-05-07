import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RecipeIngredientService } from '../../recipe-book/recipe-list/recipe/recipe-ingredient/recipe-ingredient.service';
import { RecipeIngredient } from 'src/app/models/recipe-ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('ingName') ingNameRef!: ElementRef;
  @ViewChild('ingAmount') ingAmountRef!: ElementRef;
  @ViewChild('ingDesc') ingDescRef!: ElementRef;

  constructor(private recipeIngredientService: RecipeIngredientService) {}

  ngOnInit(): void {}

  addIngredient() {
    let name = this.ingNameRef.nativeElement.value;
    let amount = this.ingAmountRef.nativeElement.value;
    let desc = this.ingDescRef.nativeElement.value;
    let newRecipeIngredient: RecipeIngredient = new RecipeIngredient(
      (this.recipeIngredientService.getRecipeItems().length + 1).toString(),
      name,
      desc,
      amount
    );
    this.recipeIngredientService.addIngredient(newRecipeIngredient);
  }

  clearForm() {
    this.ingNameRef.nativeElement.value = null;
    this.ingAmountRef.nativeElement.value = null;
    this.ingDescRef.nativeElement.value = null;
  }
}
