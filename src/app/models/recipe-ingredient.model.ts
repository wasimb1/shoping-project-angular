export class RecipeIngredient {
  id: string = '';
  name: string = '';
  description: string = '';
  amount: number = 0;
  quantity: number = 0;
  dto: number = 0;

  constructor(id: string, name: string, desc: string, amount: number, quantity: number, dto: number) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.amount = amount;
    this.quantity = quantity;
    this.dto = dto
  }
}
