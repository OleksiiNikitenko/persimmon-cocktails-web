import {ImageModel} from "../../image/model/image.model";

export interface IngredientName {
  ingredientId: number,
  name: string,
  image: ImageModel | null
}

export interface KitchenwareName {
  kitchenwareId: number,
  name: string
}
