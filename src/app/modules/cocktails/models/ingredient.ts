export interface Ingredient{
  ingredientId: number,
  name: string,
  photoId: number | null,
  category: {
    ingredientCategoryId: number,
    name: string
  } | null,
  active: boolean
}
