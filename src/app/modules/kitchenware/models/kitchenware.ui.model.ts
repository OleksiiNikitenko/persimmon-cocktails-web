export interface KitchenwareUiModel {
  kitchenwareId: number,
  name: string,
  photoId: number | null
  category: {
    kitchenwareCategoryId: number,
    name: string
  } | null,
  active: boolean
}

export interface KitchenwareCategory {
  kitchenwareCategoryId: number,
  name: string
}
