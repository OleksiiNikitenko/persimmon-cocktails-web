export interface ResponseStockIngredient {
  ingredientId: number,
  name: string,
  personId : number,
  categoryName: string | null,
  ingredientCategoryId: number | null,
  amount: number | null,
  measureType: string | null,
  photoId: number
}
