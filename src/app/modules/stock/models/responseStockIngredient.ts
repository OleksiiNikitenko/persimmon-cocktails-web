export interface ResponseStockIngredient {
  ingredientId: number,
  name: string,
  personId : number,
  categoryName: string | null,
  ingredientCategoryId: number | null,
  amount: number,
  measureType: string | null,
  photoId: number
}
