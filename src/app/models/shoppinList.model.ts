import { RecipeIngredient } from './recipe-ingredient.model';

export class ShopingListItem {
  constructor(
    public id: string,
    public name: String,
    public quantity: number,
    public description: string,
    public recipeId: string,
    public recipeName: string,
    public addedViaRecipe: number,
    public recipeIngredientId: string,
    public recipeIngredientName: string,
    public active: boolean,
    public dto: number
  ) { }
}
