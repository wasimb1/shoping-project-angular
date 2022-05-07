export class RecipeIngredient {
  id: string = '';
  name: string = '';
  description: string = '';
  amount: number = 0;

  constructor(id: string, name: string, desc: string, amount: number) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.amount = amount;
  }
}
