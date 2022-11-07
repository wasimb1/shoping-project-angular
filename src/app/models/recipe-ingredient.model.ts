export class RecipeIngredient {
  id: string = '';
  name: string = '';
  description: string = '';
  amount: number = 0;
  isDeleted: number = 0;

  constructor(id: string, name: string, desc: string, amount: number, isDeleted: number) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.amount = amount;
    this.isDeleted = isDeleted
  }
}
