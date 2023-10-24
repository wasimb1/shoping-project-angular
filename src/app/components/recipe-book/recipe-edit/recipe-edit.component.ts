import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeBookService } from '../recipe-book.service';
import { RecipeIngredient } from 'src/app/models/recipe-ingredient.model';
import { RecipeIngredientService } from '../recipe-list/recipe/recipe-ingredient/recipe-ingredient.service';
import { ConfirmationModalService } from 'src/app/common/components/modals/confirmation-modal/confirmation-modal.service';
import { GeneralModalService } from 'src/app/common/components/modals/general-modal/general-modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  sub: Subscription;
  recipeForm: FormGroup;
  recipeIngredientForm: FormGroup;
  recipeId: string;
  isEditMode: boolean = false;
  recipe: Recipe;
  selectedIndex: number = -1;
  ingredientsbyNameArray: RecipeIngredient[] = [];
  recipeIngredientsTableArray: RecipeIngredient[] = [];
  clearIngInput: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private recipeBookService: RecipeBookService,
    private recipeingredientService: RecipeIngredientService,
    private confirmationModalService: ConfirmationModalService,
    private generalModalService: GeneralModalService
  ) {}

  ngOnInit(): void {
    this.initializeForms();
    this.sub = this.route.params.subscribe(
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
    );
  }

  initializeForms() {
    this.recipeForm = this.fb.group({
      id: [""],
      name: ["", Validators.required],
      description: ["", Validators.required],
      imagePath: ["", Validators.required],
      // recipeItems: this.fb.array([])
    });

    this.recipeIngredientForm = this.fb.group({
      id: [""],
      name: ["", Validators.required],
      description: ["", Validators.required],
      amount: [null],
      quantity: ["", [Validators.required, Validators.min(1), Validators.pattern("^[1-9][0-9]*$")]],
      dto: [0]
    });
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
    // const recipeItemsformArray = this.recipeForm.get('recipeItems') as FormArray;
    // recipeItemsformArray.clear();

    // this.recipe.recipeItems.forEach(item => {
    //   const recipeItemControl = this.fb.group({
    //     id: [item.id],
    //     name: [item.name, Validators.required],
    //     description: [item.description, Validators.required],
    //     quantity: [item.quantity, [Validators.required, Validators.min(1), Validators.pattern("^[1-9][0-9]*$")]],
    //     dto: [item.dto]
    //   });
    //   recipeItemsformArray.push(recipeItemControl);
    // });

    this.recipeIngredientsTableArray = this.recipe?.recipeItems || [];

    console.log("recipeForm: ", this.recipeForm);
    console.log("recipeIngredientsTableArray: ", this.recipeIngredientsTableArray);
  }

  onSaveData() {
    console.log("recipeForm: ", this.recipeForm);
    if (this.recipeForm.valid) {
      const savedRecipe: Recipe = new Recipe(
        this.recipeForm.value['id'],
        this.recipeForm.value['name'],
        this.recipeForm.value['description'],
        this.recipeForm.value['imagePath'],
        // this.recipeForm.value['recipeItems']
        this.recipeIngredientsTableArray
      );
      if ( this.recipeIngredientsTableArray.length > 0) {
        if (this.isEditMode) {
          const upadted: number = this.recipeBookService.updateRecipe(savedRecipe);
          if (upadted >= 0) {
            alert("Recipe Updated Successfully");
            this.clearForm();
          }
          console.log("Updated: ", upadted);
        }
        else {
          const added = this.recipeBookService.AddRecipe(savedRecipe);
          if (added) {
            alert("Recipe Added Successfully");
          }
            this.clearForm();
        }
      }
      else {
        alert("Racipe must have one or more Recipe Ingredients.");
      }
    }
  }

  // addIndgredients() {
  //   const recipeItemsformArray = this.recipeForm.get('recipeItems') as FormArray;
  //   recipeItemsformArray.push(this.fb.group({
  //     id: [""],
  //     name: ["", Validators.required],
  //     description: ["", Validators.required],
  //     quantity: [null, [Validators.required, Validators.min(1), Validators.pattern("^[1-9][0-9]*$")]],
  //     dto: [0]
  //   }));
  // }

  // deleteItem(item:any, i: number) {
  //   console.log("delete item and its index: ", item, i);
  //   item.dto = 1;
  //   const recipeItemsformArray = this.recipeForm.get('recipeItems') as FormArray;
  //   console.log("recipeItemsformArray: ", recipeItemsformArray);
  //   // this.recipeIngredientService.recipeItemEditIndex.next({item});
  //   recipeItemsformArray.removeAt(i);
  // }

  onIngredientSelect(ingredient: RecipeIngredient) {
    console.log("Selected Ingredient: ", ingredient);
    this.recipeIngredientForm.patchValue({
      id: ingredient.id,
      name: ingredient.name,
      description: ingredient.description,
      quantity: ingredient.quantity,
      amount: ingredient.amount,
      dto: ingredient.dto
    });
    this.clearIngInput = false;
  }

  addIndgredientToTable() {
    // if (this.isEditMode)
    //   return;
    this.recipeForm.markAllAsTouched();
    this.recipeIngredientForm.markAllAsTouched();
    if (this.recipeForm.valid && this.recipeIngredientForm.valid) {

      if (this.selectedIndex <= -1) {
        if (this.recipeIngredientsTableArray.find(item => item.id === this.recipeIngredientForm.controls['id'].value)){
          this.generalModalService.openModal(2, 'Ingredient already exixts in the table.');
          return;
        }
        this.recipeIngredientsTableArray.push(this.recipeIngredientForm.value);
      }
      else {
        this.recipeIngredientsTableArray[this.selectedIndex].quantity = this.recipeIngredientForm.controls['quantity'].value;
      }
    }
    this.clearRecipeIngredients();
  }
  editIngredient(ingredient: RecipeIngredient, i: number) {
    console.log(ingredient);
    this.selectedIndex = i;
    this.clearIngInput = false;
    this.recipeIngredientForm.patchValue({
      id: ingredient.id,
      name: ingredient.name,
      description: ingredient.description,
      quantity: ingredient.quantity,
      amount: ingredient.amount,
      dto: ingredient.dto
    });

    this.recipeIngredientForm.controls['name'].disable();
    this.recipeIngredientForm.controls['description'].disable();
  }
  removeIngredient(e: any, i: number) {
    console.log(e)
    if (this.selectedIndex == i) {
      // alert("Item Taken for edit cannot be deleted");
      this.generalModalService.openModal(2, 'Item Taken for edit cannot be deleted');
      return;
    }
    else {
      this.confirmationModalService.openConfirmationModal(`Do you really want to delete the item '${e.name}' ?`).subscribe(res => {
        console.log("Modal Result: ", res);
        if (res){
          this.recipeIngredientsTableArray.splice(i, 1);
          this.selectedIndex = -1;
        }
        else
          console.log("Operation was cancelled");
      });
    }
}

  clearForm() {
    this.recipeForm.reset();
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  clearRecipeIngredients() {
    this.recipeIngredientForm.reset();
    this.clearIngInput = true;
    this.selectedIndex = -1;
    this.recipeIngredientForm.controls['name'].enable();
    this.recipeIngredientForm.controls['description'].enable();
  }

  ngOnDestroy(): void {
    if (this.sub)
      this.sub.unsubscribe();
  }
}
