export class OrderEntity {
  public id?: number;
  public recipe_id: number;
  public stock?: string;
  public status: string;
  public created_at: Date;
  public updated_at: Date;
}

export class IngredientStockEntity {
  public id: number;
  public name: string;
  public quantity_required: number;
  public quantity_current: number;
}
