export class Ingredient{
  ingredientId!: number
  name!: string
  photoId!: number | null
  category!: {
    ingredientCategoryId: number
    name: string
  } | null
  active!: boolean
}

export class IngredientRequest{
  name!: string
  ingredientCategoryId!: number | null
  photoId!: number | null
}
