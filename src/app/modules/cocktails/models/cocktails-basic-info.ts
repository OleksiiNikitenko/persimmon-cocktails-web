export interface CocktailBasicInfo {
  dishId: number,
  name: string,
  description: string | null,
  dishType: string | null,
  dishCategoryName: string | null,
  dishCategoryId: number | null,
  labels: string[],
  receipt: string,
  likes: number,
  isActive: boolean,
  photoUrl: string | null
}
