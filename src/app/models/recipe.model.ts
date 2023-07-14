import { RecipeIngredient } from './recipe-ingredient.model';

export class Recipe {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  recipeItems: RecipeIngredient[];

  constructor(
    id: string,
    name: string,
    description: string,
    imagePath: string,
    recipeItems: RecipeIngredient[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.recipeItems = [...recipeItems];
  }
}
