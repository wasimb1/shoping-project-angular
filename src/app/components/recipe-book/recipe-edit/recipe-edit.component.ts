import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeBookService } from '../recipe-book.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  recipeId: string;
  isEditMode: boolean = false;
  recipe: Recipe;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private recipeBookService: RecipeBookService
  ) {
    this.recipeForm = this.fb.group({
      id: [""],
      name: ["", Validators.required],
      description: ["", Validators.required],
      imagePath: ["", Validators.required],
      recipeItems: this.fb.array([])
    })
   }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeId = params['id'];
        this.isEditMode = (params['id'] !== undefined && params['id'] !== null);
        console.log("IsEditMode: ", this.isEditMode);
        if (this.isEditMode) {
          this.recipe = this.recipeBookService.getRecipe(this.recipeId) || null;
          console.log("recipe: ", this.recipe);
          this.setRecipeFormValues();
        }
      }
    )
  }

  get recipeItems() {
    return (<FormArray>this.recipeForm.get('recipeItems')).controls;
  }

  setRecipeFormValues() {
    this.recipeForm.patchValue({
      id: this.recipe.id,
      name: this.recipe.name,
      description: this.recipe.description,
      imagePath: this.recipe.imagePath
    });
    const recipeItemsformArray = this.recipeForm.get('recipeItems') as FormArray;
    recipeItemsformArray.clear();

    this.recipe.recipeItems.forEach(item => {
      const recipeItemControl = this.fb.group({
        id: [item.id],
        name: [item.name],
        description: [item.description],
        amount: [item.amount],
        dto: [item.dto]
      });
      recipeItemsformArray.push(recipeItemControl);
    });

    console.log("recipeForm: ", this.recipeForm);
  }

  onSaveData() {
    console.log("recipeForm: ", this.recipeForm);
    const savedRecipe: Recipe = this.recipeForm.value;
    if (this.isEditMode) {
      const upadted: number = this.recipeBookService.updateRecipe(savedRecipe);
      if (upadted >= 0) {
        alert("Recipe Updated Successfully");
        this.clearForm();
      }
      console.log("Updated: ", upadted);
    }
    else {
      this.recipeBookService.AddRecipe(savedRecipe);
      this.clearForm();
    }
  }

  clearForm() {
    this.recipeForm.reset();
    this.router.navigate(['recipesbook']);
  }

}
