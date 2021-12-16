export interface KitchenwareUiModel {
  kitchenwareId: number,
  name: string,
  category: {
    kitchenwareCategoryId: number,
    name: string
  } | null,
  photoId: number | null
}
