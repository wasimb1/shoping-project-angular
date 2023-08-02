import { RecipeIngredient } from './recipe-ingredient.model';

export class ShopingListItem {
  constructor(
    public id: string,
    public name: String,
    public quantity: Number,
    public recipeId: string,
    public recipeName: string,
    public addedViaRecipe: number,
    public recipeIngredient: RecipeIngredient,
    public active: boolean,
    public dto: number
  ) { }
}
