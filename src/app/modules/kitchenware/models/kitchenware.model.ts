export class Kitchenware{
  kitchenwareId!: number
  name!: string
  photoId!: number | null
  category!: {
    kitchenwareCategoryId: number
    name: string
  } | null
  active!: boolean
}

export class KitchenwareRequest{
  name!: string
  kitchenwareCategoryId!: number | null
  photoId!: number | null
}
