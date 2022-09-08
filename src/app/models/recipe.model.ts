import { RecipeIngredient } from './recipe-ingredient.model';

export class Recipe {
  id: String;
  name: String;
  description: String;
  imagePath: String;
  recipeItems: RecipeIngredient[];

  constructor(
    id: string,
    name: String,
    description: String,
    imagePath: String,
    recipeItems: RecipeIngredient[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.recipeItems = [...recipeItems];
  }
}
